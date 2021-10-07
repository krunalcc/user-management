import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './User';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseURL = "http://localhost:3004/"
  constructor(private http: HttpClient) { }
  getusers() {
    return this.http.get(this.baseURL + 'users');
  }
  getUser(id: Number) {
    return this.http.get(this.baseURL + 'users?id=' + id);
  }
  createUser(userData: User) {
    return this.http.post(this.baseURL + 'users', userData);
  }
  updateUser(userData: User) {
    return this.http.put(this.baseURL + 'users/' + userData.id, userData);
  }
  deleteUser(id: Number) {
    return this.http.delete(this.baseURL + 'users/' + id);
  }
  getLoginUser(userName: string, password: string) {
    return this.http.get(this.baseURL + 'users?userName=' + userName + '&password=' + password);
  }
}
