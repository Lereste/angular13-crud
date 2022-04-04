import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogComponent } from './../dialog/dialog.component';
import { ApiService } from './../services/api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'angular13-crud';

  // Table form by Material
  displayedColumns: string[] = ['id', 'studentName', 'gender', 'birth', 'updatedAt', 'city', 'action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // check user is login or not
    if (sessionStorage.getItem('email') && sessionStorage.getItem('password')) {
      this.getAllStudents();
    } else {
      this.router.navigate(['login']);
    }
  }

  // show form Material to add new product
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%',
    })
      .afterClosed()
      .subscribe(value => {
        if (value === 'save') {
          this.getAllStudents();
        }
      })
  }

  logOut() {
    this.router.navigate(['login']);
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('password');
  }

  // get all Student by fetch api and show them to UI
  getAllStudents() {
    this.api.getStudent()
      .subscribe({
        next: (response) => {
          // console.log(response);
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (error) => {
          alert("Error while fetching the Records!");
        }
      })
  }

  // edit student
  editStudent(row: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row,
    })
      .afterClosed()
      .subscribe(value => {
        if (value === 'update') {
          this.getAllStudents();
        }
      })
  }

  deleteStudent(id: number) {
    const message = "Are you sure you want to delete this student?";
    if (window.confirm(message)) {
      this.api.deleteStudent(id)
        .subscribe({
          next: (response) => {
            alert("Student deleted successfully!");
            this.getAllStudents();
          },
          error: (error) => {
            alert("Error: " + error.message);
          }
        })
    }
  }

  // filter by coppy code at material
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
