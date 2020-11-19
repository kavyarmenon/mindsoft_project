import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from "@angular/core";
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from "date-fns";
import * as moment from "moment";
import { Subject } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from "angular-calendar";
import { ServerService } from "src/app/server.service";
import { event } from "jquery";
import Swal from "sweetalert2";

const colors: any = [
  {
    primary: "#ad2121",
  },
  {
    primary: "#492c36",
  },
  {
    primary: "#ff0000",
  },
  {
    primary: "#ffa500",
  },
  {
    primary: "#0000ff",
  },
];
@Component({
  selector: "app-calendar-container",
  templateUrl: "./calendar-container.component.html",
  styleUrls: ["./calendar-container.component.css"],
})
export class CalendarContainerComponent {
  private yesterday: Date;
  @ViewChild("modalContent") modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  stateId: null;
  lstState = [];
  lsHolidayType = [];
  viewDate: Date = new Date();
  dctHoliday = {};
  lstHoliday = [];
  blnLoadCompleted = false;
  lst = [
    {
      actions: [
        {
          label: '<i class="fa fa-fw fa-times"></i>',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            this.events = this.events.filter((iEvent) => iEvent !== event);
            // console.log("Event deleted", event);
          },
        },
      ],
      color: { primary: "#ad2121" },
      draggable: true,
      resizable: { beforeStart: true, afterEnd: true },
      start: "Mon Nov 7 2020 00:00:00 GMT+0530 (India Standard Time)",
      title: "Christmax",
      colorIndex: null,
      type: null,
    },
    {
      actions: [
        {
          label: '<i class="fa fa-fw fa-times"></i>',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            this.events = this.events.filter((iEvent) => iEvent !== event);
            // console.log("Event deleted", event);
          },
        },
      ],
      color: { primary: "#ad2121" },
      draggable: true,
      resizable: { beforeStart: true, afterEnd: true },
      start: "Mon Nov 16 2020 00:00:00 GMT+0530 (India Standard Time)",
      title: "Gandi Jayandhi",
      colorIndex: null,
      type: null,
    },
    {
      actions: [
        {
          label: '<i class="fa fa-fw fa-times"></i>',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            this.events = this.events.filter((iEvent) => iEvent !== event);
            // console.log("Event deleted", event);
          },
        },
      ],
      color: { primary: "#ad2121" },
      draggable: true,
      resizable: { beforeStart: true, afterEnd: true },
      start: " Wed Nov 25 2020 00:00:00 GMT+0530 (India Standard Time)",
      title: "Dipavali",
      colorIndex: null,
      type: null,
    },
  ];
  colorIndex = 0;
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent("Edited", event);
      },
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent("Deleted", event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();
  events = [];
  activeDayIsOpen: boolean = false;

  constructor(private modal: NgbModal, private serverService: ServerService) {}
  ngOnInit(): void {
    this.serverService
      .getData("api/DropDownBindingAPI/ddlStateList/")
      .subscribe((res: any[]) => {
        this.lstState = res["stateList"];
        let state = this.lstState.filter(
          (element) => element.state === "Kerala"
        );
        this.stateId = state[0]["stateId"];
        this.fetchDetails();
      });
    this.serverService
      .getData("api/DropDownBindingAPI/ddlHolidayList/")
      .subscribe((res: any[]) => {
        this.lsHolidayType = res["HolidayTypeList"];
      });
    this.blnLoadCompleted = false;
  }

  fetchDetails() {
    this.serverService
      .getData("api/HolidayCalendarAPI/GetHolidayList/?stateID=" + this.stateId)
      .subscribe((res: any[]) => {
        this.lstHoliday = res["holidayList"];
        this.initializeYesterday();
        this.initializeEvents();
      });
  }
  changeHolidayType(index) {
    console.log("djbcjdsbch", this.events[index].type);

    let dctData = { primary: "" };
    dctData.primary = this.events[index].type.color;
    this.events[index].color = JSON.parse(JSON.stringify(dctData));
    this.storeHoliday();
  }
  private initializeYesterday() {
    this.yesterday = new Date();
    this.yesterday.setDate(this.yesterday.getDate() - 1);
  }

  private initializeEvents() {
    this.lstHoliday.forEach((element) => {
      this.events.push({
        title: element.description,
        colorIndex: null,
        color: { primary: element.color },
        start: new Date(element.holidayDatestr),
        draggable: true,
        type: {
          color: element.color,
          holidayTypeID: element.holidayTypeID,
          holidayTypeName: element.holidayTypeName,
          HolidayTypeList: null,
          IsSaved: false,
          Status: 0,
        },
        resizable: { beforeStart: true, afterEnd: true },
        actions: [
          {
            label: '<i class="fa fa-fw fa-times"></i>',
            onClick: ({ event }: { event: CalendarEvent }): void => {
              this.events = this.events.filter((iEvent) => iEvent !== event);
            },
          },
        ],
      });
    });
    console.log(this.events, "backensd");

    this.storeHoliday();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
    this.storeHoliday();
  }

  eventTimesChanged({
    event,
    newStart,
  }: // newEnd,
  CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          // end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent("Dropped or resized", event);
    this.storeHoliday();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.storeHoliday();

    // console.log(event, "event");
  }
  storeHoliday() {
    this.dctHoliday = {};
    this.events.forEach((element) => {
      this.dctHoliday[element.start] = {};
      this.dctHoliday[element.start]["title"] = element.title;
      this.dctHoliday[element.start]["color"] = element.color.primary;
    });
    this.blnLoadCompleted = true;
  }
  addEvent(): void {
    if (this.colorIndex >= 3) {
      this.colorIndex = 0;
    } else {
      this.colorIndex++;
    }
    this.events = [
      ...this.events,
      {
        title: "New event",
        start: startOfDay(new Date()),
        // end: endOfDay(new Date()),
        color: { primary: this.lsHolidayType[0].color },
        draggable: true,
        type: {
          color: this.lsHolidayType[0].color,
          holidayTypeID: this.lsHolidayType[0].holidayTypeID,
          holidayTypeName: this.lsHolidayType[0].holidayTypeName,
        },
        actions: [
          {
            label: '<i class="fa fa-fw fa-times"></i>',
            onClick: ({ event }: { event: CalendarEvent }): void => {
              this.events = this.events.filter((iEvent) => iEvent !== event);
              // console.log("Event deleted", event);
            },
          },
        ],
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
    this.storeHoliday();
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
    this.storeHoliday();
  }

  setView(view: CalendarView) {
    this.view = view;
    this.storeHoliday();
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  saveEvent() {
    let dctData = {};
    // dctData["stateID"] = this.stateId;
    dctData["holidayList"] = [];

    this.events.forEach((element) => {
      let dct = {};
      dct["holidayID"] = null;
      dct["stateID"] = this.stateId;
      dct["description"] = element.title;
      dct["holidayDate"] = moment(element.start)
        .format("DD/MM/YYYY")
        .toString();
      dct["holidayDatestr"] = null;
      dct["holidayTypeID"] = element.type.holidayTypeID;
      dctData["holidayList"].push(dct);
    });
    console.log(this.events, dctData, "save data");

    this.serverService
      .postData("api/HolidayCalendarAPI/Create", dctData["holidayList"])
      .subscribe((res: any[]) => {
        if (res["status"] == "Success") {
          Swal.fire("Success", "Data Saved Successfully", "success");
        }
      });
  }
}
