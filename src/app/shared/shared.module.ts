import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { DatatableFiltersComponent } from './components/datatable-filters/datatable-filters.component';
import { ClearFilterComponent } from './components/clear-filter/clear-filter.component';
import { FixedContainerComponent } from './components/fixed-container/fixed-container.component';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbComponent,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    DatatableFiltersComponent,
    ClearFilterComponent,
    FixedContainerComponent,
    AlertModalComponent,
    MatDialogModule
  ],
  declarations: [
    BreadcrumbComponent,
    DatatableFiltersComponent,
    ClearFilterComponent,
    FixedContainerComponent,
    AlertModalComponent,
  ],
})
export class SharedModule {}
