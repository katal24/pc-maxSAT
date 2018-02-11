import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map'
import { Result } from './result';

@Injectable()
export class MaxsatService {

  constructor(private http: HttpClient) { }
  serverAddress: string = "http://localhost:8080/maxsat";

  maxsat(maxsatInput: number[][][]): Observable<Result> {
    return this.http.post<Result>(this.serverAddress, maxsatInput);
  }

}
