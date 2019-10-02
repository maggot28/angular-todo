import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem("todoAuthToken")
    request = request.clone({
      setHeaders : {
        Authorization : `Bearer ${token != null ? token : ''}`,
        'Content-Type' : 'application/json'
      },
    })
    return next.handle(request);
  }
}