import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Userservice } from '../users-service';
import { AppRoutes, gender, User, UtilitiesService } from 'app/shared';
import { getCountryListMap, getCountryFlag } from 'country-flags-dial-code';
import { BehaviorSubject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { AlertModalComponent } from 'app/shared/components/alert-modal/alert-modal.component';

@Component({
  selector: 'app-add-update-user',
  templateUrl: './add-update-user.component.html',
  styleUrls: ['./add-update-user.component.scss'],
})

export class AddUpdateUserComponent implements OnInit {
  id: any = null;
  breadcrumbs = []
  form: FormGroup;

  genderList = gender;
  userDetails: User;

  mobile_prefix$ = new BehaviorSubject([]);

  get accountFormArray() {
    return this.form.get('account') as FormArray;
  }

  get profilePic() {
    return this.form.get('profile_photo').value;
  }

  set profilePic(value) {
    this.form.get('profile_photo').setValue(value);
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  constructor(
    public location: Location,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: Userservice,
    private utilitiesService: UtilitiesService,
    public domSanitizer: DomSanitizer,
    private dialog: MatDialog
  ) {
    this.activatedRoute.params.subscribe((data) => {
      console.log(data['id']);
      this.id = data['id'];
    });

    this.getCountryCodes();


    this.form = this.fb.group({
      id: null,
      profile_photo: [null],
      first_name: [null, Validators.compose([Validators.required, Validators.maxLength(60)])],
      last_name: [null, Validators.compose([Validators.required, Validators.maxLength(60)])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      personal_id: [null, Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])],
      mobile_number: [null],
      mobile_prefix: [this.mobile_prefix$.value[0].dialCode],
      gender: [null, Validators.compose([Validators.required])],
      address: this.fb.group({
        country: [null],
        city: [null],
        street: [null],
        zip_code: [null],
      }),
      account: this.fb.array([this.getAccountFormGroup()]),
    });
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
        name: this.id ? 'Update' : 'Create',
      },
    ];
  }

  uploadFile(files) {
    let reader = this.utilitiesService.convertImageToBase64(files[0]);
    reader.onload = (readerEvt: any) => {
      this.profilePic = readerEvt.target.result;
    };
  }

  getCountryCodes() {
    try {
      let countryFlags = getCountryListMap();
      let countryCodes = [];
      Object.keys(countryFlags).forEach((key) => {
        countryCodes.push(countryFlags[key]);
      });
      this.mobile_prefix$.next(countryCodes);
    } catch {
    } finally {
    }
  }

  getAccountFormGroup(account: any = null) {
    return this.fb.group({
      account: [
        account ? account.account : null,
        Validators.compose([Validators.required]),
      ],
    });
  }

  addAccountFormGroup(account: any = null) {
    this.accountFormArray.push(this.getAccountFormGroup(account));
  }

  removeAccountFormGroup(index: number) {
    this.accountFormArray.removeAt(index);
  }

  async ngOnInit(): Promise<void> {
    this.setBreadcrumbs()
    if (this.id) {
      try {
        const userDetails = await this.userService
          .getUserDetails(this.id)
          .toPromise();
        if (userDetails) {
          this.userDetails = userDetails;
          this.patchForm();
        }
      } catch {
      } finally {
      }
    }
  }

  patchForm() {
    const {
      address, id, first_name, last_name, email, personal_id, mobile_number, gender, profile_photo, mobile_prefix } = this.userDetails;
    this.form.patchValue({
      id,
      first_name,
      profile_photo,
      last_name,
      email,
      personal_id,
      mobile_number,
      gender,
      mobile_prefix: mobile_prefix
        ? mobile_prefix
        : this.mobile_prefix$.value[0].dialCode,
      address: {
        country: address.country,
        street: address.street,
        city: address.city,
        zip_code: address.zip_code,
      },
    });

    if (this.userDetails.account && this.userDetails.account.length) {
      this.accountFormArray.clear();
      this.userDetails.account.forEach((account) => {
        this.addAccountFormGroup(account);
      });
    }
  }

  goToPreviousPage() {
    this.location.back();
  }

  getFlag(code) {
    return getCountryFlag(code);
  }

  async onSubmit() {
    if (this.form.valid) {
      let size = this.utilitiesService.isMobileAlertModal();
      const dialogRef = this.dialog.open(AlertModalComponent, {
        data: {},
        maxWidth: '',
        width: `${size.width}`,
        height: `${size.height}`,
        panelClass: 'no-padding',
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe(async (resp) => {
        if (resp) {
          try {
            let form = this.form.value;
            if (this.id) {
              const updateUser = await this.userService
                .updateUser(form)
                .toPromise();
              if (updateUser) {
                this.goToPreviousPage();
              }
            } else {
              const saveUser = await this.userService
                .saveUser(form)
                .toPromise();
              if (saveUser) {
                this.goToPreviousPage();
              }
            }
          } catch {
          } finally {
          }
        }
      });
    }
  }
}
