import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { LayoutComponent } from './layout.component';
import { UserMenuModule } from '../common/user-menu/user-menu.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    HttpClientModule,
    RouterModule,
    MatDividerModule,
    UserMenuModule,
    SharedModule,
  ],
  exports: [LayoutComponent],
})
export class LayoutModule {}
