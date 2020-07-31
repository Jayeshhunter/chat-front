import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'htpp://localhost:3000/api/chatapp';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  GetAllUsers(): Observable<any> {
    return this.http.get(`${BASEURL}/users`);
  }

  GetUserById(id): Observable<any> {
    return this.http.get(`${BASEURL}/user/${id}`);
  }

  GetUserByName(username): Observable<any> {
    return this.http.get(`${BASEURL}/username/${username}`);
  }

  FollowUser(id): Observable<any> {
    return this.http.post(`${BASEURL}/follow-user`, {
      userFollowed: id,
    });
  }
  UnFollowUser(id): Observable<any> {
    return this.http.post(`${BASEURL}/unfollow-user`, {
      userFollowed: id,
    });
  }
  MarkNotification(id, deleteValue?): Observable<any> {
    return this.http.post(`${BASEURL}/mark/${id}`, {
      id,
      deleteValue,
    });
  }
  MarkAllAsRead(): Observable<any> {
    return this.http.post(`${BASEURL}/mark-all`, {
      all: true,
    });
  }
}
