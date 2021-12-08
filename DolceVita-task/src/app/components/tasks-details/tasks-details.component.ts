import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { Task } from 'src/app/class/task';
import { ClientService } from 'src/app/servieces/client.service';


@Component({
  selector: 'app-tasks-details',
  templateUrl: './tasks-details.component.html',
  styleUrls: ['./tasks-details.component.css']
})
export class TasksDetailsComponent implements OnInit {



  newTask: Task;
  status_task: string;
  id_task: string;
  date_task: Date;
  content_task: string;
  currentTask: Task;
  openForm: boolean = true;
  authenticationFlag: boolean = true;
  updt: boolean = false;
  @Output()
  onAddTask: EventEmitter<string> = new EventEmitter<string>();

  constructor(private clientSrc: ClientService) { }


  ngOnInit() {

  }




  //1----Add task------:


  onSubmit(form) {

    debugger;
    this.clientSrc.AddedTask = new Task();
    this.clientSrc.AddedTask.TaskId = this.id_task;
    this.clientSrc.AddedTask.Content_task = this.content_task;
    this.clientSrc.AddedTask.Status = this.status_task;
    switch (this.status_task) {
      case 'option1': {
        this.clientSrc.AddedTask.Status = 'in process';
        break;
      }
      case 'option2': {
        this.clientSrc.AddedTask.Status = 'complete';

        break;
      }
      case 'option3': {
        this.clientSrc.AddedTask.Status = 'unbeknown';
        break;
      }
      default: {
        this.clientSrc.AddedTask.Status = this.status_task;
        break;
      }
    }
    this.clientSrc.AddedTask.d_Date = this.date_task;

    this.clientSrc.AddTask().subscribe(
      res=>{
        this.onAddTask.emit("new task was added");
      }

    );
    form.reset()
    this.updt=false;
  }




  showForm() {
    this.openForm = false;
  }

  closeForm() {
    this.openForm = true;
    this.id_task = null
    this.date_task = null;
    this.status_task =null;
    this.content_task = null;
    this.updt=false;

  }

//update exist task:
  actionOfUpdate(e: Task) {
    debugger;
    this.id_task = e.TaskId;
    this.date_task = e.d_Date;
    this.status_task = e.Status;
    this.content_task = e.Content_task;
    this.updt = true;
    this.openForm = false;
  }





}
