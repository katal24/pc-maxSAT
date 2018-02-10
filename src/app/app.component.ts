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

  files: FileList;
  // file: string = 'assets/dictionary';

  getFiles(event) {
    this.files = event.target.files;
    // this.logForm(event);
  }
  logForm() {
    // console.log(this.files);
    return this.http.get(this.file);
      
  } 

  getFile() {
    this.logForm().subscribe(data => console.log(data), error => console.log(error));
  }


  loadConfigFile() {
    console.log("load")
    this.loadFromFile('configFile', function (data) {
      console.log(data.target.result);
    });
  }

  loadFromFile(elementName, onDataCallback) {
    // var file = this.getFile();
    this.file = (document.getElementById(elementName))["files"][0];
    var reader = new FileReader();
    // reader.onloadend = function (e) {
    //   onDataCallback(e.target.result);
    //   this.$apply();
    // };
    var fileReader = new FileReader();
    //try to read file, this part does not work at all, need a solution
    fileReader.onload = onDataCallback;
    fileReader.readAsText(this.file);
  }
}
