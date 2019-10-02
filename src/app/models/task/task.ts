import { environment } from '../../../environments/environment';

export class Task {
    public name : string
    public description : string
    public id : string
    public priority : any = {order: 0, label: ''}
    public deadline : Date
    public edit : boolean = false

    constructor(json:any){
        this.name = json.name
        this.priority.order = json.priority 
        this.priority.label = environment.priority[json.priority-1] 
        this.id = json.id
        this.deadline = new Date(json.deadline)
        this.description = json.description
    }

    toJSON() {
        return {
            name: this.name,
            description: this.description,
            priority: this.priority.order,
            deadline: this.deadline,
        }
    }
}
