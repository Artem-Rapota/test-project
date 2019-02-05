import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpStudentCRUDSevice } from './service/http-student-crud.service';
import {Sort} from '@angular/material';
import { Student } from './lib/student';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  students: Student[];
  student: Student = new Student();
  sortedData: Student[];

  constructor(
    private studentCRUDSevice: HttpStudentCRUDSevice
  ) { }

  ngOnInit(): void {
    this.refresh();
  }

  selectStudent(id) {
    this.studentCRUDSevice.getStudent(id).subscribe( (data: Student) => {
      this.student = data;
    });
  }

  delete(id) {
    this.studentCRUDSevice.deleteStudent(id).subscribe(data => {
      this.refresh();
      if (this.student.id === id) {
        this.student = new Student();
      }
    });
  }

  submit(form: NgForm) {
    if (form.invalid) {
      return false;
    }

    if (this.student.id) {
      this.studentCRUDSevice.updateStudent(this.student.id, this.student).subscribe(data => {
        console.log('success');
        this.refresh();
      }, error => {
        console.log('error');
      });
    } else {
      this.studentCRUDSevice.addStudent(this.student).subscribe(data => {
        console.log('success');
        this.refresh();
      }, error => {
        console.log('error');
      });
    }
  }

  refresh() {
    this.students = [];
    this.studentCRUDSevice.getAllStudents().subscribe((data: Student[]) => {
      this.students = data;
      this.sortedData = this.students.slice();
    });
  }

  sortData(sort: Sort) {
    const data = this.students.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'thfirstname': return this.compare(a.firstName, b.firstName, isAsc);
        case 'thlastname': return this.compare(a.lastName, b.lastName, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  newStudent () {
    this.student = new Student();
  }
}
