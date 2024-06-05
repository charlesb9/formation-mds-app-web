import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { User } from "../interfaces/user.interface";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = "http://localhost:3000";

  loggedIn = false;

  private router = inject(Router)

  constructor(private http: HttpClient) {
    this.loggedIn = !!localStorage.getItem('token');
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/user/`);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/register`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user._id}`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  assignUserToProject(userId: string, projectId: string): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/${userId}/projects/${projectId}`,
      {}
    );
  }

  assignUserToTask(userId: string, taskId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${userId}/tasks/${taskId}`, {});
  }

  login(email: string, password: string): Observable<string> {
    return this.http.post<string>(
      `${this.apiUrl}/auth/login`,
      { email, password },
      {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      }
    ).pipe(
      tap(token => {
        localStorage.setItem('token', token)
        this.loggedIn = true;
      })
    );
  }


  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }
}
