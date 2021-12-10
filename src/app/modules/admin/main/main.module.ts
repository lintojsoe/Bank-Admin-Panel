import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AppRoutes } from 'app/shared';
import { MainComponent } from './main.component';

const exampleRoutes: Route[] = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: AppRoutes.user,
        redirectTo: AppRoutes.user,
        pathMatch: 'full',
      },
      {
        path: AppRoutes.user,
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
    ],
  },
];

@NgModule({
  declarations: [MainComponent],
  imports: [RouterModule.forChild(exampleRoutes)],
})
export class MainModule {}
