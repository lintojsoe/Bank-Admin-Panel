import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UtilitiesService } from './utilitiesService';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  BASE_URL: string = '';
  private headersObject = {};
  constructor(
    private httpClient: HttpClient,
    private utilitiesService: UtilitiesService
  ) {
    this.BASE_URL = environment.server_url;
    this.headersObject = {
      'Content-Type': 'application/json',
    };
  }

  public get(
    path: string,
    params: HttpParams = new HttpParams(),
    headersObject: object = {},
    showError = true,
    takeResponse = false
  ): Observable<any> {
    this.headersObject = {};
    const headers = new HttpHeaders({
      ...headersObject,
      ...this.headersObject,
    });

    const options = {
      headers,
      observe: takeResponse ?  "response" as 'body' : 'body',
      params,
    };

    return this.httpClient
      .get(this.BASE_URL + path, options)
      .pipe(
        catchError((response) =>
          this.formatErrors(response, path, false, showError)
        )
      );
  }

  public put(
    path: string,
    body: object = {},
    params: HttpParams = new HttpParams(),
    headersObject: object = {},
    showError = true
  ): Observable<any> {
    const headers = new HttpHeaders({
      ...headersObject,
      ...this.headersObject,
    });

    const options = {
      headers: headersObject == null ? {} : headers,
      params,
    };

    return this.httpClient
      .put(this.BASE_URL + path, body, options)
      .pipe(
        catchError((response) =>
          showError ? this.formatErrors(response, path) : throwError(response)
        )
      );
  }

  public patch(
    path: string,
    body: object = {},
    params: HttpParams = new HttpParams(),
    headersObject: object = {},
    showError = true
  ): Observable<any> {
    const headers = new HttpHeaders({
      ...headersObject,
      ...this.headersObject,
    });

    const options = {
      headers,
      params,
    };

    return this.httpClient
      .patch(this.BASE_URL + path, body, options)
      .pipe(
        catchError((response) =>
          showError ? this.formatErrors(response, path) : throwError(response)
        )
      );
  }

  public post(
    path: string,
    body: object = {},
    headersObject: object = {},
    showError = true
  ): Observable<any> {
    const headers = new HttpHeaders({
      ...headersObject,
      ...this.headersObject,
    });

    const options = {
      headers,
    };

    return this.httpClient
      .post(this.BASE_URL + path, body, options)
      .pipe(
        catchError((response) =>
          showError ? this.formatErrors(response, path) : throwError(response)
        )
      );
  }

  public delete(
    path: string,
    headersObject: object = {},
    showError = true
  ): Observable<any> {
    const headers = new HttpHeaders({
      ...headersObject,
      ...this.headersObject,
    });

    const options = {
      headers,
    };

    return this.httpClient
      .delete(this.BASE_URL + path, options)
      .pipe(
        catchError((response) =>
          showError ? this.formatErrors(response, path) : throwError(response)
        )
      );
  }

  async formatErrors(
    errorResponse: any,
    path: any,
    throwGeneric = false,
    showError = true
  ): Promise<Observable<any>> {
    console.log('Error response', errorResponse);
    let message = errorResponse.error;
    this.utilitiesService.showErrorToast(message);

    throw throwError(errorResponse);
  }
}
