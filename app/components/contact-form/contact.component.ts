import { Component } from "@angular/core"
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'contact',
    templateUrl: './app/components/contact-form/contact.html',
    styles: [ ".col-lg-10 { margin-bottom: 2rem; }" ]

})

export class Contact {

    feedback: FormGroup;

    SendFeedback(): void{

    }

}