import { Injectable } from '@angular/core';
import { Task } from '../class/task';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  AddedTask: Task;
  // erorMsg: string;

  constructor(private http: HttpClient) { }

  url: string = " http://localhost:52024/api/task"

  AddTask() {

    return this.http.post(this.url, this.AddedTask);


  }



  RemoveClient(removeClient: Task): Observable<any> {

    return this.http.put(this.url, removeClient);
  }


  GetTasksList(): Observable<any> {
    return this.http.get<any>(this.url);
  }


}
