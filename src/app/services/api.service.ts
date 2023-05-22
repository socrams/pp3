import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private token: string;
  private tokenSubject: Subject<string> = new Subject<string>();

  private url: string = 'http://127.0.0.1:5000/';

  constructor(private http: HttpClient) { 
    this.token = '';
    this.login('mail@mail.com.ar', 'password');
  }

  login(_mail: string, _password: string) {
    const credentials = {
      mail: _mail,
      password: _password
    };
    this.http.post<any>(this.url + 'login', 
                        JSON.stringify(credentials), 
                        {headers: {'Content-type': 'application/json'}}).subscribe(
                          response => {
                                this.token = response.message;
                                this.tokenSubject.next(this.token);
                              }
                            );      
  }

  getToken(): Observable<string> {
    return this.tokenSubject.asObservable();
  }

  callURL<T>(method: string, url: string, body?: any): Observable<T> {
     return new Observable<T>(observer => { 
      this.getToken().subscribe(token => {
        if (token) {
          this.callURLWithToken<T>(method, url, token, body).subscribe(
            response => {
              observer.next(response);
              observer.complete();
            },
            error => {
              observer.error(error);
            }
          );
        } else {
          observer.error('Token no disponible');
        }
     })
    })
  }
  
  private callURLWithToken<T>(method: string, url: string, token: string, body?: any): Observable<T> {
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
