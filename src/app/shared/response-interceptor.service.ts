import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export class ResponseInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('headers modified in request interceptor, and logged in response interceptor');
        console.log(req.headers);

        return next.handle(req).pipe(tap(event => {
            console.log(event.type);
            if (event.type === HttpEventType.Response) {
                console.log('response recieved in the response interceptor');
                console.log(event.body);
            }
        }));
    }
}
