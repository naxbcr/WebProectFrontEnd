
export class User {
    id: number;
    id_position: number;
    email: string;       
    first_name: string;  
    last_name: string;   
    emailconfirm: boolean;
    postionname: string;

    constructor(id: number, idp: number, email: string, fname: string, lname: string,emailconf: boolean, pname: string){
        this.id = id;
        this.id_position = idp;
        this.email = email;
        this.first_name = fname;
        this.last_name = lname;
        this.emailconfirm = emailconf;
        this.postionname = pname;
    }

    



}