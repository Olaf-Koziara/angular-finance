import { HttpInterceptorFn } from "@angular/common/http";
import { environment } from "../../../environments/environment";

export const apiInterceptor: HttpInterceptorFn = (request, next)=>{
    const req = request.clone({url:`${environment.API_ORIGIN}${request.url}`})
    return next(req);

}