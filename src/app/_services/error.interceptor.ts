import {Injectable} from "@angular/core";
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";


@Injectable()

export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(httpErrorResponse => {
        // 401 error
        if (httpErrorResponse.status === 401) {
          return throwError('Unauthorized')
        }

        if (httpErrorResponse instanceof HttpErrorResponse) {
          const applicationError = httpErrorResponse.headers.get("Application-Error");
          if (applicationError) {
            return throwError(applicationError);
          }
          const serverError = httpErrorResponse.error;
          let modalStateErrors = '';
          if (serverError.errors && typeof serverError.errors === "object") {
            for (const key in serverError.errors) {
              if (serverError.errors.hasOwnProperty(key)) {
                modalStateErrors += serverError.errors[key] + "\n";
              }
            }
          }
          return throwError(modalStateErrors || serverError || 'Server Error');
        }
      })
    )
  }
}

export const ErrorInterceptorProvider = {

  provide: HTTP_INTERCEPTORS,
  useClass: HttpErrorInterceptor,
  multi: true

};
