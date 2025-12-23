import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  if (
    req.url.startsWith('http') ||
    req.url.startsWith('/i18n/') ||
    req.url.startsWith('/assets/')
  ) {
    return next(req);
  }

  const apiReq = req.clone({
    url: `${environment.API_ORIGIN}${req.url}`,
  });

  return next(apiReq);
};
