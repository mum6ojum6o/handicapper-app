import { ErrorHandler } from '@angular/core';

export class AppErroHandler implements ErrorHandler {
  handleError(error) {
    //alert('An unexpected Error occured!!');
    console.log(error);
  }
}
