import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ServerResponse } from 'src/app/models/server-response';
import { BaseService } from '../base.service';
import { Task } from 'src/app/models/task/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends BaseService {

  public readonly tasks : ReplaySubject<Task[]>
  private tasksData : Task[]

  constructor(
    private http: HttpClient,
  ) {
    super()
    this.tasks = new ReplaySubject<Task[]>(1)
   }


  get(status : string = ''){
    let response
    if(status){
      response = this.http.get(environment.apiUrl+'/task/get/'+status)
    } else {
      response = this.http.get(environment.apiUrl+'/task/get')
    }
    response.pipe(map(data => new ServerResponse(data))).pipe(catchError(this.handleError))
    response.subscribe((response : ServerResponse) => { 
      if(response.status == true){
        this.tasksData = response.data.map((task : any) => new Task(task))
        this.tasks.next(this.tasksData)
      }
    }) 
  }

  create(taskCreateData) {
    let response = this.http.post(environment.apiUrl+'/task/create', taskCreateData)
    .pipe(map(data => new ServerResponse(data))).pipe(catchError(this.handleError))
    response.subscribe((response : ServerResponse) => { 
      if(response.status == true){
        this.tasksData.push(new Task(response.data))
        this.tasks.next(this.tasksData)
      }
    }) 
  }

  update(id : string, taskUpdateData, updateValue = false) {
    let response
    if(updateValue !== false){
      response = this.http.patch(environment.apiUrl+'/task/update/'+id, {field:taskUpdateData, value:updateValue})
    } else{
      response = this.http.put(environment.apiUrl+'/task/update/'+id, taskUpdateData.toJSON())
    }
    response.pipe(map(data => new ServerResponse(data))).pipe(catchError(this.handleError))
    response.subscribe((response : ServerResponse) => { 
      if(response.status == true){
        if(taskUpdateData == "status"){
          this.tasksData = this.tasksData.filter(task => task.id != id)
        } else {
          let task = new Task(response.data);
          var index = this.tasksData.indexOf(task);
          this.tasksData[index] = task;
        }
        this.tasks.next(this.tasksData)
      }
    }) 
  }

  delete(id : string, forever : boolean = false) {
    let response
    if (forever){
      response = this.http.delete(environment.apiUrl+'/task/delete/'+id+'/forever')
    } else {
      response = this.http.delete(environment.apiUrl+'/task/delete/'+id)
    }
    response.pipe(map(data => new ServerResponse(data))).pipe(catchError(this.handleError))
    response.subscribe((response : ServerResponse) => { 
      if(response.status == true){
        this.tasksData = this.tasksData.filter(task => task.id != id)
        this.tasks.next(this.tasksData)
      }
    }) 
  }


  
}
