import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class RequestInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const modifiedRequest = req.clone({
            headers: req.headers.append('new-header', 'from request interceptor').append('second-header', 'also from request interceptor')
        })
        console.log('request is going on its way after being modified');
        return next.handle(modifiedRequest);
    }
}
