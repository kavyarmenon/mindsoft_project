import {
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  Input,
  EventEmitter,
  Output,
} from "@angular/core";
import { HolidayType } from "./../holiday.type";
import * as $ from "jquery/dist/jquery.min.js";

// import "fullcalendar";
@Component({
  selector: "app-calender",
  templateUrl: "./calender.component.html",
  styleUrls: ["./calender.component.css"],
})
export class CalenderComponent {
  @Input() viewModes = ["month", "agendaWeek", "agendaDay"];
  @Input() navButtons = ["prev", "next", "today"];
  @Input() appointments: HolidayType[] = [];
  @Output() requestNewAppointment = new EventEmitter<HolidayType>();
  @Output() requestUpdateAppointment = new EventEmitter<HolidayType>();
  @Output() appointmentUpdated = new EventEmitter<HolidayType>();
  @ViewChild("calendar") calendar: ElementRef;
  constructor() {}

  get Instance(): any {
    return $(this.calendar.nativeElement);
  }

  ngOnDestroy(): void {
    this.Instance.fullCalendar("destroy");
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges.appointments && simpleChanges.appointments.currentValue) {
      this.updateAppointments();
    }
  }

  ngAfterViewInit(): void {
    this.Instance.fullCalendar({
      selectable: true,
      editable: true,
      eventSources: [
        {
          events: this.appointments || [],
        },
      ],
      header: {
        left: this.navButtons.join(","),
        center: "title",
        right: this.viewModes.join(","),
      },
      select: (start, end) => {
        this.requestNewAppointment.emit(
          this.neutralize({ start: start.toDate(), end: end.toDate() })
        );
      },
      eventClick: (event: HolidayType) => {
        this.requestUpdateAppointment.emit(this.neutralize(event));
      },
      eventDrop: (event: HolidayType, delta, revert) => {
        this.appointmentUpdated.emit(this.neutralize(event));
      },
    });
  }

  private updateAppointments(): void {
    // we have to do it this way, because other wise the plugin is dependent on the
    // reference of the event source. So we have to remove all event sources and add a new one
    this.Instance.fullCalendar(
      "removeEventSources",
      this.Instance.fullCalendar("getEventSources")
    );
    this.Instance.fullCalendar("addEventSource", {
      events: this.appointments,
    });
  }

  private neutralize(event: HolidayType): HolidayType {
    // the widget mutates the appointment in many ways. We can keep it consistent with this function
    const { start, end, title, holiday, id } = event;
    return { start, end, title, holiday, id };
  }
}
