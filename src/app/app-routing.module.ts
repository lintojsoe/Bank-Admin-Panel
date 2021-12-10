import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { LayoutComponent } from './layout/layout/layout.component';
import { AppRoutes } from './shared/constants/app-routes';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: AppRoutes.user },
  { path: 'login', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule) },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../app/modules/admin/main/main.module').then(
            (m) => m.MainModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
