import { Injectable } from '@angular/core';
import { ApiRoutes, ApiService } from 'app/shared';

@Injectable({
  providedIn: 'root',
})
export class Userservice {
  constructor(private api: ApiService) { }
  getUserList(queryParams: any = {}) {
    return this.api.get(ApiRoutes.USER, queryParams, undefined, true, true);
  }

  saveUser(form: any = null) {
    return this.api.post(ApiRoutes.USER, form);
  }

  updateUser(form: any = null) {
    return this.api.patch(`${ApiRoutes.USER}/${form.id}/`, form);
  }

  deleteUser(id: number) {
    return this.api.delete(`${ApiRoutes.USER}/${id}/`);
  }

  getUserDetails(id: number) {
    return this.api.get(`${ApiRoutes.USER}/${id}/`);
  }
}
