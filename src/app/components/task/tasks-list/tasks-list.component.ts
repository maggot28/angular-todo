import { Component, Input, Inject } from '@angular/core';
import { Task } from 'src/app/models/task/task';
import { TaskService } from 'src/app/services/task/task.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent {

  @Input() type : string

  public tasks : Task[] = null
  public tabActive : boolean
  private subscription: Subscription

  @Input() set active(active: boolean) {
    if(active){
      this.taskService.get(this.type)
    }
    this.subscription = this.taskService.tasks.subscribe((userTasks : Task[]) => {
      this.tasks = userTasks
    })
  }

  constructor(
    private taskService : TaskService,
    private dialog: MatDialog,
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  statusChange(id : string, status : boolean): void {
    this.taskService.update(id, 'status', status)
  }

  restore(id : string): void {
    this.taskService.update(id, 'restore', true)
  }

  delete(id : string, forever : boolean = false): void {
    if(forever){
      this.taskService.delete(id, true)
    } else{
      this.taskService.delete(id)
    }
  }

  openTask(event, task: Task): void {
    if(event.target.className == "mat-list-item-content"){
      const dialogRef = this.dialog.open(TasksEditComponent, {
        width: '450px',
        data: task
      });
      dialogRef.afterClosed().subscribe(result => {
        this.taskService.update(task.id, task)
      });
    }
  }

}


@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksEditComponent {

  constructor(
    public dialogRef: MatDialogRef<TasksEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
