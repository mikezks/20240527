import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";


export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  console.log('http request', req.method, req.url);

  if (req.url.startsWith('https://demo.angulararchitects.io/api/')) {
    const headers = req.headers.set('Authorization', 'Bearer MyAuthToken-A1B2C3');
    req = req.clone({ headers });
  }

  return next(req).pipe(
    tap(resp => console.log('http response', resp))
  );
}
