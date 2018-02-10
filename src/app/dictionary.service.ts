import { Injectable } from '@angular/core';

@Injectable()
export class DictionaryService {

  public source: string;
  dictionary : Map<string, number>;

  constructor() {
    this.dictionary = new Map<string, number>();
   }

  createDictionaryFromString() : void {
    var keys: string[] = this.source.split("\n");
    
    keys.forEach( (key, index) => {
      this.dictionary.set(key, index+1);
    });
  }


}
