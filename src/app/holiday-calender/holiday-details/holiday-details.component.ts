import {
  Component,
  SimpleChanges,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges,
} from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { HolidayType } from "./../holiday.type";

@Component({
  selector: "app-holiday-details",
  templateUrl: "./holiday-details.component.html",
  styleUrls: ["./holiday-details.component.css"],
})
export class HolidayDetailsComponent {
  @Input() appointment: HolidayType;
  @Input() isNew: boolean;
  @Output() close = new EventEmitter();
  @Output() add = new EventEmitter<HolidayType>();
  @Output() update = new EventEmitter<HolidayType>();
  form = this.formBuilder.group({
    title: [null, Validators.required],
    allDay: [null],
    start: [],
    end: [],
    holiday: [null],
  });
  constructor(private formBuilder: FormBuilder) {}

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges.appointment && simpleChanges.appointment.currentValue) {
      this.form.patchValue({ ...this.appointment });
    }
  }

  onAdd(): void {
    const { end, start, title, allDay, holiday } = this.form.value;
    this.add.emit({
      end: end && new Date(end),
      start: start && new Date(start),
      title,
      holiday,
    });
  }

  onUpdate(): void {
    const { end, start, title, allDay, holiday, id } = this.form.value;
    this.update.emit({
      id: this.appointment.id,
      end: end && new Date(end),
      start: start && new Date(start),
      title,
      holiday,
    });
  }
}
