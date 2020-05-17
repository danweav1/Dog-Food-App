import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken(); // get the stored token
    const authRquest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken),
    }); // clone request before manipulating request because you will cause unwanted side effects otherwise due to the way they are handled internally
    // we can edit the object as we're cloning it
    return next.handle(authRquest).pipe(
      catchError((err, caught) => {
        if (err.status === 401) {
          this.handleAuthError();
          return of(err);
        }
        throw err;
      })
    );
  } // first param is any outgoing requests we are intercepting, second is like the next in nodejs, which allows us to leave the interceptor to continue our journey through the app

  private handleAuthError() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
