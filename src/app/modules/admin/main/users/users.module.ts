import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from 'app/shared/shared.module';
import { MatDividerModule } from '@angular/material/divider';
import { AddUpdateUserComponent } from './add-update-user/add-update-user.component';
import { ViewUserComponent } from './view-user/view-user.component';

@NgModule({
  declarations: [UsersComponent, AddUpdateUserComponent, ViewUserComponent],
  imports: [
    UsersRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatDividerModule,
    SharedModule,
  ],
  exports: [],
})
export class UsersModule {}
