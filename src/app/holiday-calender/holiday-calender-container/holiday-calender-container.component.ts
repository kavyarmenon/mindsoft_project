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
import "fullcalendar";
@Component({
  selector: "app-holiday-calender-container",
  templateUrl: "./holiday-calender-container.component.html",
  styleUrls: ["./holiday-calender-container.component.css"],
})
export class HolidayCalenderContainerComponent {
  isNew = null;
  appointmentDetail: HolidayType;
  appointments: HolidayType[] = [
    {
      id: new Date().getTime().toString(),
      title: "event1",
      start: new Date(),
    },
  ];

  onRequestNewAppointment(e: HolidayType): void {
    this.isNew = true;
    this.appointmentDetail = e;
  }

  onRequestUpdateAppointment(e: HolidayType): void {
    this.isNew = false;
    this.appointmentDetail = e;
  }

  onCloseAppointmentDetail(): void {
    this.appointmentDetail = null;
    this.isNew = null;
  }

  onAdd(appointment: HolidayType): void {
    this.appointments = [
      ...this.appointments,
      { id: new Date().getTime().toString(), ...appointment },
    ];
    this.onCloseAppointmentDetail();
  }

  onUpdate(appointment: HolidayType): void {
    this.appointments = this.appointments.map((a) =>
      a.id === appointment.id ? { ...a, ...appointment } : a
    );
    this.onCloseAppointmentDetail();
  }

  onAppointmentUpdated(appointment: HolidayType): void {
    this.onUpdate(appointment);
  }
}
