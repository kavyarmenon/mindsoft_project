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

const colors: any = [
  {
    primary: "#ad2121",
  },
  {
    primary: "#1e90ff",
  },
  {
    primary: "#e3bc08",
  },
  {
    primary: "#492c36",
  },
  {
    primary: "#a74b6b",
  },
  {
    primary: "#22403d",
  },
  {
    primary: "#bada55",
  },
  {
    primary: "#845422",
  },
  {
    primary: "#7df9ff",
  },
  {
    primary: "#0095b6",
  },
  {
    primary: "#0892d0",
  },
  {
    primary: "#295f48",
  },
  {
    primary: "#0000A0",
  },
  {
    primary: "#800080",
  },
  {
    primary: "#808000",
  },
  {
    primary: "#342D7E",
  },
  {
    primary: "#254117",
  },
  {
    primary: "#306754",
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
  lstColors = [
    "#ad2121",
    "#1e90ff",
    "#e3bc08",
    "#492c36",
    "#a74b6b",
    "#22403d",
    "#bada55",
    "#845422",
    "#7df9ff",
    "#0095b6",
    "#0892d0",
    "#295f48",
    "#0000A0",
    "#800080",
    "#808000",
    "#342D7E",
    "#254117",
    "#306754",
  ];
  lst = [
    {
      actions: [
        {
          label: '<i class="fa fa-fw fa-times"></i>',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            this.events = this.events.filter((iEvent) => iEvent !== event);
            console.log("Event deleted", event);
          },
        },
      ],
      color: { primary: "#1e90ff" },
      draggable: true,
      resizable: { beforeStart: true, afterEnd: true },
      start: "Mon Nov 7 2020 00:00:00 GMT+0530 (India Standard Time)",
      title: "Christmax",
      colorIndex: null,
    },
    {
      actions: [
        {
          label: '<i class="fa fa-fw fa-times"></i>',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            this.events = this.events.filter((iEvent) => iEvent !== event);
            console.log("Event deleted", event);
          },
        },
      ],
      color: { primary: "#1e90ff" },
      draggable: true,
      resizable: { beforeStart: true, afterEnd: true },
      start: "Mon Nov 16 2020 00:00:00 GMT+0530 (India Standard Time)",
      title: "Gandi Jayandhi",
      colorIndex: null,
    },
    {
      actions: [
        {
          label: '<i class="fa fa-fw fa-times"></i>',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            this.events = this.events.filter((iEvent) => iEvent !== event);
            console.log("Event deleted", event);
          },
        },
      ],
      color: { primary: "#e3bc08" },
      draggable: true,
      resizable: { beforeStart: true, afterEnd: true },
      start: " Wed Nov 25 2020 00:00:00 GMT+0530 (India Standard Time)",
      title: "Dipavali",
      colorIndex: null,
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

  constructor(private modal: NgbModal, private serverService: ServerService) {
    this.initializeYesterday();
    this.initializeEvents();
  }
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
  }

  fetchDetails() {
    this.serverService
      .getData("api/HolidayCalendarAPI/GetHolidayList/?stateID=" + this.stateId)
      .subscribe((res: any[]) => {
        console.log(res, "holiday calander");
      });
  }
  changeHolidayType(index) {
    if (this.events[index].type == 1) {
      this.events[index].color.primary = "#ff0000";
    } else if (this.events[index].type == 2) {
      this.events[index].color.primary = "#ffa500";
    } else if (this.events[index].type == 3) {
      this.events[index].color.primary = "#0000ff";
    }
    this.storeHoliday();
    console.log(index, this.events[index].type, this.events, "change holiday");
  }
  private initializeYesterday() {
    this.yesterday = new Date();
    this.yesterday.setDate(this.yesterday.getDate() - 1);
  }

  private initializeEvents() {
    this.lst.forEach((element) => {
      for (let index = 0; index < Object.keys(colors).length; index++) {
        // console.log(
        //   element.color.primary,
        //   colors[index]["primary"],
        //   index,
        //   "check vlues"
        // );

        if (element.color.primary === colors[index]["primary"]) {
          element.colorIndex = index;
        }
      }
      // this.dctHoliday[element.start] = element.title;
      this.events.push({
        title: element.title,
        colorIndex: null,
        color: colors[element.colorIndex],
        start: new Date(element.start),
        draggable: true,
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
    this.storeHoliday();

    console.log(this.events, this.dctHoliday, "list");

    // this.events = [
    //   {
    //     title: "Deletable event",
    //     colorIndex: null,
    //     color: colors[0],
    //     start: this.yesterday,
    //     actions: [
    //       {
    //         label: '<i class="fa fa-fw fa-times"></i>',
    //         onClick: ({ event }: { event: CalendarEvent }): void => {
    //           this.events = this.events.filter((iEvent) => iEvent !== event);
    //           console.log("Event deleted", event);
    //         },
    //       },
    //     ],
    //   },
    //   {
    //     actions: [
    //       {
    //         label: '<i class="fa fa-fw fa-times"></i>',
    //         onClick: ({ event }: { event: CalendarEvent }): void => {
    //           this.events = this.events.filter((iEvent) => iEvent !== event);
    //           console.log("Event deleted", event);
    //         },
    //       },
    //     ],
    //     draggable: true,
    //     color: colors[0],
    //     start: new Date(
    //       " Sat Nov 07 2020 14:20:49 GMT+0530 (India Standard Time)"
    //     ),
    //     title: "Deletable event",
    //     colorIndex: null,
    //   },
    //   {
    //     actions: [
    //       {
    //         label: '<i class="fa fa-fw fa-times"></i>',
    //         onClick: ({ event }: { event: CalendarEvent }): void => {
    //           this.events = this.events.filter((iEvent) => iEvent !== event);
    //           console.log("Event deleted", event);
    //         },
    //       },
    //     ],
    //     color: colors[0],
    //     draggable: true,
    //     resizable: { beforeStart: true, afterEnd: true },
    //     start: new Date(
    //       "Mon Nov 16 2020 00:00:00 GMT+0530 (India Standard Time)"
    //     ),
    //     title: "New event",
    //     colorIndex: null,
    //   },
    //   {
    //     actions: [
    //       {
    //         label: '<i class="fa fa-fw fa-times"></i>',
    //         onClick: ({ event }: { event: CalendarEvent }): void => {
    //           this.events = this.events.filter((iEvent) => iEvent !== event);
    //           console.log("Event deleted", event);
    //         },
    //       },
    //     ],
    //     color: colors[0],
    //     draggable: true,
    //     resizable: { beforeStart: true, afterEnd: true },
    //     start: new Date(
    //       " Wed Nov 25 2020 00:00:00 GMT+0530 (India Standard Time)"
    //     ),
    //     title: "New event",
    //     colorIndex: null,
    //   },
    // ];
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
    console.log("check 6", this.events);
    this.storeHoliday();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(event, "event");
  }
  storeHoliday() {
    this.dctHoliday = {};
    this.events.forEach((element) => {
      console.log(element, "ekleemtn");

      this.dctHoliday[element.start] = {};
      this.dctHoliday[element.start]["title"] = element.title;
      this.dctHoliday[element.start]["color"] = element.color.primary;
    });
    console.log(this.dctHoliday, "holiday");
  }
  addEvent(): void {
    if (this.colorIndex >= 17) {
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
        color: colors[this.colorIndex],
        draggable: true,
        actions: [
          {
            label: '<i class="fa fa-fw fa-times"></i>',
            onClick: ({ event }: { event: CalendarEvent }): void => {
              this.events = this.events.filter((iEvent) => iEvent !== event);
              console.log("Event deleted", event);
            },
          },
        ],
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
    console.log("check 4", this.events);
    this.storeHoliday();
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
    console.log("check 3", this.events);
  }

  setView(view: CalendarView) {
    console.log("check 2");

    this.view = view;
    this.storeHoliday();
  }

  closeOpenMonthViewDay() {
    console.log("check 1");
    this.activeDayIsOpen = false;
  }
  changeColor(event) {
    // console.log("color changes", this.colorIndex, event);

    event.color.primary = colors[this.colorIndex]["primary"];
    if (this.colorIndex >= 17) {
      this.colorIndex = 0;
    } else {
      this.colorIndex++;
    }
    this.storeHoliday();
  }
}
