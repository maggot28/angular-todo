export class Setting {
    public orderType : string

    constructor(json:any){
        this.orderType = json.order_type
    }
}
