import { Component, Input, OnInit } from "@angular/core"
import { Translate } from '../../shared/model/trans.model'
import { Comment } from '../../shared/model/comment.model'
import { RemainingTime } from '../../shared/model/remainingtime.model'

@Component ({
    selector: 'trans-item-new-order',
    templateUrl : './app/components/trans-item-new-order/trans-item-new-order.html'
    
})

export class Transitemneworder implements OnInit {
    @Input() trans: Translate;

    time: RemainingTime;

    constructor(){
        
    }

    ngOnInit(){
        this.time = new RemainingTime(this.trans);
    }

    

}
