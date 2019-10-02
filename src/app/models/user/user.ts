import { Md5 } from 'ts-md5/dist/md5';

export class User {

    public name : string
    public email : string
    public avatarUrl : string

    constructor(json:any){
        this.name = json.name
        this.email = json.email
        const md5 = new Md5()
        this.avatarUrl = 'https://www.gravatar.com/avatar/' + md5.appendStr(this.email).end()
    }

}
