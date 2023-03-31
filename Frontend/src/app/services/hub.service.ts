import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hub } from '../classes/hub';

@Injectable({
  providedIn: 'root'
})
export class HubService {

  constructor(private http: HttpClient) { }

  rootUrl = "https://us-central1-tech-spaces.cloudfunctions.net/api/api";

  getSpaces() : Observable<Hub[]> {
    return this.http.get<Hub[]>(this.rootUrl + '/spaces');
  }
}
