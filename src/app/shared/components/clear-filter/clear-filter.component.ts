import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-clear-filter',
  templateUrl: './clear-filter.component.html',
  styleUrls: ['./clear-filter.component.scss'],
})
export class ClearFilterComponent implements OnInit {
  @Input() form: FormGroup;
  @Output() clearFilterHandler: EventEmitter<void> = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}
  clearAll() {
    this.form.reset();
    this.clearFilterHandler.emit();
  }

  hasValue() {
    return Object.keys(this.form.value).some(
      (control) => !!this.form.value[control]
    );
  }
}
