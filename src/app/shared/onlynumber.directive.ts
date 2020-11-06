import {
  Directive,
  HostListener,
  ElementRef,
  Output,
  EventEmitter,
  Renderer2,
} from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: "[OnlyNumber]",
})
export class OnlyNumber {
  constructor(private _el: ElementRef) {}

  @HostListener("input", ["$event"]) onInputChange(event) {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, "");
    if (initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
