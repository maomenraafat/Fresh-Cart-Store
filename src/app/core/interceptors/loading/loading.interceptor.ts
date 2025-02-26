import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const _ngxSpinnerService = inject(NgxSpinnerService);

  if (!req.url.includes('cart') && !req.url.includes('auth')) {
    _ngxSpinnerService.show();
  } else if (req.url.includes('cart') && req.method === 'GET') {
    _ngxSpinnerService.show();
  }
  return next(req).pipe(
    finalize(() => {
      _ngxSpinnerService.hide();
    })
  );
};
