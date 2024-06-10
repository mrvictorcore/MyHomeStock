import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from '../models/estructure-response/api-response';

@Injectable({
  providedIn: 'root'
})
export class HandlerService {

  constructor() {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('A ocurrido un error: ', error.error.message);
    } else {
      console.error(`El backend devolvió: ${error.status}, body: ${error.error}`);
    }

    return throwError(() => new Error('Algo malo ha ocurrido; por favor, inténtalo de nuevo más tarde.'));
  }

  handleResponse<Data>(observable: Observable<ApiResponse<Data>>): Observable<Data | void> {
    return observable.pipe(
      map(response => {
        if (response.error) throw new Error(response.message) || 'Ha ocurrido un error';
        return response.data as Data;
      }),
      catchError(this.handleError)
    );
  }
}
