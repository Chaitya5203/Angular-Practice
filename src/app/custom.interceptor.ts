import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  debugger;
  const mytoken = localStorage.getItem('Token');
  const clonerequest = req.clone({
    setHeaders:{
      Authorization:`Bearer ${mytoken}`
    }
  })
  return next(clonerequest);
};
