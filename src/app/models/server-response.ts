export class ServerResponse {
    
    public status:boolean
    public message:string
    public data:any

    constructor(json:any){
        this.status = json.status
        this.message = json.message 
        this.data = json.data 

    }

}
