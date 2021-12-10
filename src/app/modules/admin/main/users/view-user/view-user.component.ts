import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Userservice } from '../users-service';
import { AppRoutes, gender, User } from 'app/shared';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
})
export class ViewUserComponent implements OnInit {
  userDetails: User;
  genderList = gender
  id: any;
  breadcrumbs =[]
  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private userService: Userservice,
    private _router:Router
  ) {
    this.activatedRoute.params.subscribe((data) => {
      console.log(data['id']);
      this.id = data['id'];
      this.getUserDetails();
    });
  }

  getGender(id) {
   return this.genderList.filter(gen => gen.id == id)[0] || null
  }

  update(){
    this._router.navigate([`${AppRoutes.user}/update/${this.id}`])
  }

  async getUserDetails() {
    try {
      const userDetails = await this.userService
        .getUserDetails(this.id)
        .toPromise();
      if (userDetails) {
        this.userDetails = userDetails;
      }
    } catch {
    } finally {
    }
  }

  setBreadcrumbs() {
    this.breadcrumbs = [
      {
        absolute: true,
        disabled: false,
        path: `${AppRoutes.user}`,
        relative: false,
        name: 'Users',
      },
      {
        absolute: true,
        disabled: true,
        path: ``,
        relative: false,
        name: 'View',
      },
    ];
  }

  ngOnInit(): void {
    this.setBreadcrumbs()
  }

  goBack() {
    this.location.back();
  }
}
