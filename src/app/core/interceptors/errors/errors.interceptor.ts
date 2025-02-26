import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const _toastrService = inject(ToastrService);

  return next(req).pipe(
    catchError((err) => {
      // if (
      //   err.error.message !==
      //   'You are not logged in. Please login to get access'
      // )
      _toastrService.error(err.error.message, 'FreshCart');
      return throwError(() => err);
    })
  );
};
