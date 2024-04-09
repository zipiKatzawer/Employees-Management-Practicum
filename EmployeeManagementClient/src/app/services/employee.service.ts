import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:7098/api'; // URL של השרת

  constructor(private _http: HttpClient) { }
  getEmployeeList(): Observable<Employee[]> {
    return this._http.get<Employee[]>(`${this.apiUrl}/employee`);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this._http.get<Employee>(`${this.apiUrl}/employee/${id}`);
  }
  addEmployee(employee: Employee) {
    console.log("employee", employee)
    return this._http.post(`${this.apiUrl}/employee`, employee);
  }
  deleteEmployee(id: number): Observable<any> {
    console.log("id", id);

    return this._http.delete(`${this.apiUrl}/employee/${id}`);
  }
  updateEmployee(id: number, employee: Employee) {

    return this._http.put(`${this.apiUrl}/employee/${id}`, employee);
  }
  login(userLogin: any) {
    console.log("userLogin", userLogin);

    return this._http.post(`${this.apiUrl}/employee/Login`, userLogin);
  }
}
