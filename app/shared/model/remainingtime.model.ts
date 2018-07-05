import { Translate } from "../../shared/model/trans.model"

export class RemainingTime
{

constructor(item: Translate)
{
    this.today = new Date();
    this.item = item;
    this.calculateTime();
}


item: Translate; // represent of translate

days: number; // days to end
hours: number; // hour to end
minutes: number; // minutes to end

today: Date; // today is
end_date: Date;
remains: number;

calculateTime(){
         // вычисляем время до конца
         this.end_date = new Date(this.item.end_date);
         this.remains = this.end_date.getTime() - this.today.getTime();

         this.hours = Math.ceil(((this.remains / (1000*60*60)) % 24));
         this.minutes = Math.ceil(((this.remains / (1000*60)) % 60));
         this.days = Math.ceil((this.remains / (1000*60*60*24)));
    }

getRemainingTime(): string{
    let time =this.days+"d "+this.hours+"h "+this.minutes+"min ";
    return time;
}

}