import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

exclude_array : string[] = ['/login','/register','/verifyEmail'];

 toExclude(url :string)
 {
  var length = this.exclude_array.length;
  for(var i = 0; i < length; i++) {
      if( url.search(this.exclude_array[i]) != -1  )
          return true;
  }
  return false;  
 }

 
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.toExclude(request.url))
    {
    let jwt = this.authService.getToken();
    let reqWithToken = request.clone( {
    setHeaders: { Authorization : "Bearer "+jwt}
    })
    return next.handle(reqWithToken);
    }

    return next.handle(request);
  }


}
