import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
import * as $ from 'jquery';

@Component({
  selector: 'app-network-status',
  templateUrl: './network-status.component.html',
  styleUrls: ['./network-status.component.css']
})
export class NetworkStatusComponent implements OnInit {
  title = 'internet-connection-check';
status = 'ONLINE'; //initializing as online by default
isConnected = true;

  constructor(private connectionService:ConnectionService) { 
    
  }

  ngOnInit() {
    
  }

}
