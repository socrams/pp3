import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { url } from '../modelo/config';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url = url;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  login(_mail: string, _password: string) {
    const credentials = {
      mail: _mail,
      password: _password,
    };
    return new Observable<any>((observer) => {
      this.http
        .post<any>(this.url + 'auth/login', JSON.stringify(credentials), {
          headers: { 'Content-type': 'application/json' },
        })
        .subscribe(
          (response) => {
            if (response.message !== 'ERROR') {
              this.authService.setToken(response.message);
              observer.next(true);
            } else {
              this.authService.removeToken();
              observer.next(false);
            }
            observer.complete();
          },
          (error) => {
            observer.next(false);
            observer.complete();
          }
        );
    });
  }

  callURL<T>(method: string, url: string, body?: any): Observable<T> {
    return new Observable<T>((observer) => {
      let token = this.authService.getToken();
      this.callURLWithToken<T>(method, url, token, body).subscribe(
        (response) => {
          observer.next(response);
          observer.complete();
        },
        (error) => {
          observer.error(error);
          observer.complete();
        }
      );
    });
  }

  // validateToken(): any {
  //   this.callURL<any>('GET', 'validateToken/', null).subscribe(
  //     response => {
  //       if (response.message != 'token valido') {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     },
  //     error => {
  //       return false;
  //     });
  // }
  validateToken(): Promise<boolean> {
    let token = this.authService.getToken();
    return !token ?
        new Promise<boolean>(resolve => {
            resolve(false);
            return false;
        }) :
        this.http.post(this.url + 'auth/validateToken', { 'token': token })
            .toPromise()
            .then((res) => {
              console.log("token", res);
                
              localStorage.getItem(JSON.stringify(res));
                return true;
            }
            ).catch((error) => {
              
                return false
            });
}

  private callURLWithToken<T>(
    method: string,
    url: string,
    token: string,
    body?: any
  ): Observable<T> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    headers = headers.append('Content-type', 'application/json');
    let params = new HttpParams();
    if (method === 'GET' && body) {
      // Si el método es GET y hay un body, convertirlo en parámetros de la URL
      for (const key in body) {
        if (body.hasOwnProperty(key)) {
          params = params.set(key, body[key]);
        }
      }
    }

    const options = {
      headers,
      params,
    };

    switch (method.toUpperCase()) {
      case 'GET':
        return this.http.get<T>(this.url + url, options);
      case 'POST':
        return this.http.post<T>(this.url + url, body, options);
      case 'PUT':
        return this.http.put<T>(this.url + url, body, options);
      case 'DELETE':
        return this.http.delete<T>(this.url + url, options);
      // Agrega otros casos para otros métodos HTTP que necesites
      default:
        throw new Error(`Método HTTP no válido: ${method}`);
    }
  }
}
