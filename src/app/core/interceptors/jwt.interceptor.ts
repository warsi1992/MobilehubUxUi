import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  console.log('JWT INTERCEPTOR EXECUTED');

  const token = localStorage.getItem('token');

  console.log('TOKEN =', token);

  if (token) {

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log(req.headers.get('Authorization'));
  }

  return next(req);
};