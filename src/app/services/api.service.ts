import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postStudent(data: any) {
    return this.http.post<any>("https://js-post-api.herokuapp.com/api/students/", data);
  }

  getStudent() {
    return this.http.get<any>("https://js-post-api.herokuapp.com/api/students/");
  }

  putStudent(data: any, id: number) {
    return this.http.put<any>("https://js-post-api.herokuapp.com/api/students/" + id, data);
  }

  deleteStudent(id: number) {
    return this.http.delete<any>("https://js-post-api.herokuapp.com/api/students/" + id);
  }

  // Api to work with Authentication
  postUser(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/signup`, data);
  }

  getUser() {
    return this.http.get<any>(`${environment.apiUrl}/signup`);
  }
}
