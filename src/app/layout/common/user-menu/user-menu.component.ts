import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilitiesService } from 'app/shared';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit {

  constructor(private utilitiesService: UtilitiesService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.utilitiesService.setStorageItem("isLogin", "false")
    this.router.navigate(['login'])
  }

}
