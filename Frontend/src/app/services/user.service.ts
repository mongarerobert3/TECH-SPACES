import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  rootUrl = "https://us-central1-tech-spaces.cloudfunctions.net/api/api";

  getUsers() : Observable<User[]> {
    return this.http.get<User[]>(this.rootUrl + '/users');
  }

}
