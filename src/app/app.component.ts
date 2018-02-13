import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private http: HttpClient){

  }

  file: any = null;
  agentsActive = false;
  pcActive = false;
  maxSatActive = false;
  resultsActive = false;
  
  toggleHeaders(subPage : string) : void {
    this.falseHeaders();
    switch(subPage){
      case 'agents': this.agentsActive = true; break;
      case 'pc': this.pcActive = true; break; 
      case 'maxSat': this.maxSatActive = true; break; 
      case 'results': this.resultsActive = true; break; 
       
    }
  }

  falseHeaders() : void {
    this.agentsActive = this.pcActive = this.maxSatActive = this.resultsActive = false;
  }

}
