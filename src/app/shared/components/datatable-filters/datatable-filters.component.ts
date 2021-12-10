import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FilterTypes } from 'app/shared';

@Component({
    selector: 'app-datatable-filters',
    templateUrl: './datatable-filters.component.html',
    styleUrls: ['./datatable-filters.component.scss'],
})
export class DatatableFiltersComponent implements OnInit {
    @Input() type: string = FilterTypes.Text;
    @Input() options = [];
    @Input() formcontrol?: FormControl;
    @Input() name: string;
    filterTypes = FilterTypes;
    constructor() {}

    ngOnInit(): void {}
}
