import { getLocaleDateFormat } from '@angular/common';
import { Component, AfterViewInit, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Task } from 'src/app/class/task';
import { ClientService } from 'src/app/servieces/client.service';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  TaskId: string;
  d_Date: Date;
  Status: string;
  Content_task: string;

  ELEMENT_DATA: Task[] = []
  displayedColumns: string[] = ['TaskId', 'Content_task', 'Status', 'Date', 'Action'];
  dataSource = new MatTableDataSource();
  searchText;
  rout: string;
  warning: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private clientSrc: ClientService, private router: Router, private _snackBar: MatSnackBar) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.rout = this.router.url;
    console.log(window.location.href);
    this.displayTasksList();
  }



  displayTasksList() {
    debugger;
    this.clientSrc.GetTasksList().subscribe(
      res => {
        this.ELEMENT_DATA = res
        console.log("element data", this.ELEMENT_DATA);
        this.dataSource.data = this.ELEMENT_DATA
      });


    //order by Name,Date,Status:
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      debugger;
      let date = "d_Date"
      switch (property) {

        case 'Date': return new Date(item[date]);

        default: return item[property];

      }

    }

  }



  OnClickRemove(tsk: Task) {
    debugger;
    //check if user can remove the task:
    let date1 = new Date();
    let date2 = new Date(tsk.d_Date);
    //calculate the difference between 2 days by unix time:
    let total = date2.getTime() - date1.getTime();
    let days = total / (1000 * 3600 * 24);

    if (days > 6) {
      this.openSnackBar()
    }

    else {

      this.clientSrc.RemoveClient(tsk).subscribe(
        res => {
          this.ELEMENT_DATA = res
          this.dataSource.data = this.ELEMENT_DATA;

        });
    }


  }

  openSnackBar() {
    this._snackBar.open('You are not authorized to delete this task !!', 'cancel', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }



  //
  actionOfAdd(e: string) {
    this.ngOnInit();
  }


  applyFilter(filterValue: string) {
    debugger
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

}
