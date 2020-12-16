import {Component, OnInit} from '@angular/core';
import { LoadingService } from './services/loading.service';
import { messageService } from './services/message.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    LoadingService,
    messageService
  ],
})
export class AppComponent implements  OnInit {

    constructor() {

    }

    ngOnInit() {


    }

  logout() {

  }

}
