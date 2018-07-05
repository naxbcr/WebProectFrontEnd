import { Component, Input } from "@angular/core"
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'app-home',
    templateUrl: './app/home/home.html',
    styles: [  `#start { margin-top: 60px;} .col-lg-10 { margin-bottom: 2rem;  }   `]
    

})



export class HomeComponent {

    Home: string="I am home page";

}