import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor(
    private _snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver
  ) {}

  setStorageItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getStorageItem(key: string): string {
    return localStorage.getItem(key);
  }

  removeStorageItem(key: string) {
    localStorage.removeItem(key);
  }

  showErrorToast(msg) {
    this._snackBar.open(`${msg}`, 'Error', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['error'],
    });
  }
  showSuccessToast(msg) {
    this._snackBar.open(`${msg}`, 'Success', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success'],
    });
  }

  isMobile() {
    let isMobileObser = this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
    ]);
    let isMobile = false;
    isMobileObser.subscribe((data) => {
      isMobile = data.matches;
    });
    return isMobile;
  }

  isMobileAlertModal() {
    let size = {
      width: '25vw',
      height: '20vh',
    };
    let isMobileObser = this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
    ]);
    isMobileObser.subscribe((data) => {
      if (data.matches) {
        size.height = '30%';
        size.width = '96%';
      }
    });
    return size;
  }

  convertImageToBase64(image) {
    var reader = new FileReader();
    let file = image;
    reader.readAsDataURL(file);
    return reader;
  }
}
