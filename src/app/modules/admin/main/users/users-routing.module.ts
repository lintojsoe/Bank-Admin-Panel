import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUpdateUserComponent } from './add-update-user/add-update-user.component';
import { UsersComponent } from './users.component';
import { ViewUserComponent } from './view-user/view-user.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
  {
    path: 'view/:id',
    component: ViewUserComponent,
  },
  {
    path: 'update/:id',
    component: AddUpdateUserComponent,
  },
  {
    path: 'create',
    component: AddUpdateUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule { }
