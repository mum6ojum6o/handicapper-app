import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppError } from './common/apperror';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private httpClient: HttpClient,
    private url: string) {
    }
    getAll() {
      console.log('getAll');
      console.log(this.url);
      return this.httpClient.get(this.url).pipe(
        map(response => {
          console.log('form dataservice:' + response);
          return response as any;
        }),
        catchError(this.handleError)
      );
    }

    private handleError(error: Response) {
      console.log('caught in dataservice' + error);
      if (error.status === 404) {
       return throwError(new AppError(error));
      }
      if (error.status === 400) {
        return throwError(new AppError(error));
      }
    }

    public setUrl(newUrl: string) {
      this.url = newUrl;
    }

    public addParameterToUrl(newParam: string) {
      this.url += newParam;
    }

    add(resource: any)/*: Observable<PlayerComponent>*/ {
      return this.httpClient.post(this.url, resource).pipe(
        map( response => {
          return response as any;
        })
      , catchError(this.handleError)
      );
      /*return this.httpClient.post(this.url, resource)*/;
     }
}
