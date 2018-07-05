export class Comment
{
    constructor(id: number,created_date: Date,comment:string,id_user:number,id_translate:number,position:string,userfname:string,userlname:string)
    {
        this.id =id;
        this.created_date = created_date;
        this.comment = comment;
        this.id_user = id_user;
        this.id_translate = id_translate;
        this.postion = position;
        this.userfname = userfname;
        this.userlname = userlname;
    }

    id: number;
    created_date: Date;
    comment:string;
    id_user:number;
    id_translate:number;
    postion:string;
    userfname:string;
    userlname:string;

}