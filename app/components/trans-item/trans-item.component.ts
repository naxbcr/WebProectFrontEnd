import { Component, Input } from "@angular/core"
import { Translate } from '../../shared/model/trans.model'
import { Comment } from '../../shared/model/comment.model'

@Component ({
    selector: 'trans-item',
    templateUrl : './app/components/trans-item/trans-item.html'
    
})

export class Transitem {
    @Input() trans: Translate;

    

}
