import { Injectable } from '@angular/core';
import { Result } from './result'

@Injectable()
export class ResultService {

  psResults : Result[];
  satResults : any[];

  

  constructor() {
    this.psResults = [];
    this.satResults = [];
  }




}
