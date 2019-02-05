import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable()
export class HttpStudentCRUDSevice {

    constructor(private http: HttpClient) { }

    getAllStudents() {
      return this.http.get(`${apiUrl}/api/Student`);
    }

    getStudent(id) {
      return this.http.get(`${apiUrl}/api/Student/${id}`);
    }

    deleteStudent(id) {
      return this.http.delete(`${apiUrl}/api/Student/${id}`);
    }

    addStudent(body) {
      return this.http.post(`${apiUrl}/api/Student`, body);
    }

    updateStudent(id, body) {
      return this.http.put(`${apiUrl}/api/Student/${id}`, body);
    }
}
