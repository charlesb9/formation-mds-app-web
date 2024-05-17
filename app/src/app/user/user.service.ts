// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {

//   constructor() { }
// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://your-api-url.com/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  assignUserToProject(userId: string, projectId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${userId}/projects/${projectId}`, {});
  }

  assignUserToTask(userId: string, taskId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${userId}/tasks/${taskId}`, {});
  }

  login(email: string, password: string): Observable<string> {
    const loginUrl = `${this.apiUrl}/login`;
    return this.http.post<string>(loginUrl, { email, password }, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}