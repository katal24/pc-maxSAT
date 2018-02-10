import { Component, OnInit } from '@angular/core';
import { DictionaryService } from '../dictionary.service';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit {

  file: any = null;
  self: any;

  constructor(private dictionaryService: DictionaryService) { 
    this.self = this;
    // self.dictionarySerive = dictionaryService;
  }

  ngOnInit() {
  }

  loadConfigFile() {
    this.loadFromFile('configFile', (data) => {
      this.dictionaryService.source = data.target.result;
      this.dictionaryService.createDictionaryFromString();
    });
  }

  loadFromFile(elementName, onDataCallback) {
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
