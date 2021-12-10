import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes, Pagination, User, UtilitiesService } from 'app/shared';
import { combineLatest } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Userservice } from './users-service';
import { FilterTypes } from 'app/shared';
import { AlertModalComponent } from 'app/shared/components/alert-modal/alert-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],

})
export class UsersComponent implements OnInit, AfterViewInit {
  @ViewChild('userPaginator') userPaginator: any;

  page = new Pagination().page;

  userData: any = null;

  breadcrumbs = [];

  columns: string[] = [
    'profile_photo',
    'first_name',
    'last_name',
    'personal_id',
    'email',
    'mobile_number',
    'action',
  ];

  form: FormGroup;
  groups = [];
  urlData: any = {
    params: '',
    qParams: {} as any,
  };
  isLoading = false;
  filtersWithQparams = null;
  filterType = FilterTypes;
  constructor(
    private fb: FormBuilder,
    private userService: Userservice,
    private route: ActivatedRoute,
    private _router: Router,
    private utilitiesService: UtilitiesService,
    private dialog: MatDialog
  ) {
    this.setBreadcrumbs()
  }

  async ngOnInit(): Promise<void> {
    this.formInit();
    this.getUserList();
  }

  setBreadcrumbs() {
    this.breadcrumbs = [
      {
        absolute: true,
        disabled: true,
        path: `${AppRoutes.user}`,
        relative: false,
        name: 'Users',
      },
    ];
  }

  ngAfterViewInit(): void {
    if (this.urlData.qParams.pageIndex) {
      this.userPaginator._pageIndex = this.urlData.qParams.pageIndex;
    }
  }

  getUserList() {
    combineLatest([this.route.params, this.route.queryParams])
      .pipe(debounceTime(0))
      .subscribe(async (data) => {
        this.urlData.params = data[0].filter || '';
        this.urlData.qParams = data[1];

        let filters = {};

        this.filtersWithQparams = Object.assign(filters, this.urlData.qParams);

        Object.keys(this.filtersWithQparams).forEach((key) => {
          this.form.patchValue(
            {
              [key]: this.filtersWithQparams[key],
            },
            { emitEvent: false }
          );
        });

        let getUserResponse = await this.userService
          .getUserList(
            Object.assign(
              { _limit: this.page.pageSize, _page: 1 },
              this.filtersWithQparams
            )
          )
          .toPromise();

        this.userData = getUserResponse.body;
        this.page.length = getUserResponse.headers.get('X-Total-Count');

        if (this.urlData.qParams.pageIndex) {
          this.userPaginator._pageIndex = this.urlData.qParams.pageIndex;
        }
      });
  }

  formInit() {
    this.form = this.fb.group({
      first_name_like: [null],
      last_name_like: [null],
      personal_id_like: [null],
      email_like: [null],
      mobile_number_like: [null],
    });

    this.form.valueChanges.pipe(debounceTime(400)).subscribe((data) => {
      this.userPaginator.firstPage();
      let urlData = this.getUrlAndParams();

      urlData.qParams._limit = this.page.pageSize;
      urlData.qParams._page = 1;
      urlData.qParams.pageIndex = 0;

      Object.keys(data).forEach((key) => {
        urlData.qParams[key] = data[key];
      });
      this.navigateSameRoute(urlData);
    });
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  getUrlAndParams() {
    return {
      url: `${AppRoutes.user}${this.urlData.params}`,
      qParams: JSON.parse(JSON.stringify(this.urlData.qParams)),
    };
  }

  async onPaginationSelect($event) {
    this.page.pageSize = $event.pageSize;

    let urlData = this.getUrlAndParams();

    urlData.qParams._limit = this.page.pageSize;
    urlData.qParams._page = $event.pageIndex + 1;
    urlData.qParams.pageIndex = $event.pageIndex;
    this.navigateSameRoute(urlData);
  }

  navigateSameRoute(urlData: { url: string; qParams: any }) {
    this._router.navigate([AppRoutes.user], {
      queryParams: urlData.qParams,
      replaceUrl: true,
    });
  }

  deleteUser(userObject) {
    let content = `Are you sure, Do you want to delete ${userObject?.first_name} ${userObject?.last_name} ?`;
    let heading = `Delete`;
    let size = this.utilitiesService.isMobileAlertModal();
    const dialogRef = this.dialog.open(AlertModalComponent, {
      data: { heading, content },
      maxWidth: '',
      width: `${size.width}`,
      height: `${size.height}`,
      panelClass: 'no-padding',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(async (resp) => {
      if (resp) {
        try {
          this.userService.deleteUser(userObject.id).subscribe((data) => {
            this.utilitiesService.showSuccessToast('User deleted successfully');
            this.getUserList();
          });
        } catch {
        } finally {
        }
      }
    });
  }
}
