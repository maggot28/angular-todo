import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task/task.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  public taskForm : FormGroup
  public taskEditFrom : FormGroup
  public activeTab : string = 'active'
  
  constructor(
    private taskService : TaskService,
    private formBuilder : FormBuilder
  ) { }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      priority: [2],
      deadline: [{value: new Date().setUTCDate(0)}],
    })
  }

  create(formData) {
    this.taskService.create(formData)
  }

  changeTab(tab : any){
    if(tab.index == 2){
      this.activeTab = "archive"
    } else if (tab.index == 1){
      this.activeTab = "done"
    } else {
      this.activeTab = "active"
    }
  }

}
