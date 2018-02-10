import { Component, OnInit, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { Wizard } from "clarity-angular";
import { AgentService } from '../agent.service';
import { PcService } from '../pc.service';
import { ResultService } from '../result.service';
import { DictionaryService } from '../dictionary.service';
import { Attribut } from '../attribut';
import { PcResult } from '../pcResult';
import { Result } from '../result';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-max-sat',
  templateUrl: './max-sat.component.html',
  styleUrls: ['./max-sat.component.css']
})
export class MaxSatComponent implements OnInit {

  model : number[][][];
  error : string = "";

  constructor(private agentService: AgentService, private resultService: ResultService, private dictionaryService: DictionaryService) {
  }

  setTypeOfComparison(attribute: Attribut, nr: number): void {
    attribute.comparisonType = [false, false, false];
    attribute.comparisonType[nr] = true;
  }

  deleteItemFromArray(array: number[], item: number) : number[] {
    var index = array.indexOf(item, 0);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
  }

  countIdealAgentModel(){
    var idealAgentModel : number[] = [];

    for(let i=1; i<this.dictionaryService.dictionary.size+1; i++ ) {
      idealAgentModel.push(-i);
      console.log(-i);
    }

    this.agentService.attributes.forEach( attr => {
      var keys = Array.from(this.dictionaryService.dictionary.keys());
      if (keys.indexOf(attr.perfectValue) != -1 ) {
        let clause = this.dictionaryService.dictionary.get(attr.perfectValue);
        idealAgentModel = this.deleteItemFromArray(idealAgentModel, -clause);
        idealAgentModel.push(clause);
      }
    })

    console.log(idealAgentModel);


  }

  countTheBest() {
    this.resultService.satResults = []
    
    this.countIdealAgentModel();


    // this.agentService.agents.forEach((agent, index) => {
    //   agent.values.forEach((attributeValue, id) => {
    //     let firstAttribute: Attribut = this.agentService.attributes[id];
    //     if (firstAttribute.comparisonType[0]) {
    //       if (this.checkSmaller(attributeValue, firstAttribute.perfectValue)) {
    //         agent.points++;
    //       }
    //     } else if (firstAttribute.comparisonType[1]) {
    //       if (this.checkGreater(attributeValue, firstAttribute.perfectValue)) {
    //         agent.points++;
    //       }
    //     } else {
    //       if (this.checkEquals(attributeValue, firstAttribute.perfectValue)) {
    //         agent.points++;
    //       }
    //     }
    //   });
    //   console.log(agent.name + ": " + agent.points);
    //   this.resultService.satResults.push(new Result(agent.name, agent.points));
    // });
  }



  // countTheBest(){
  //   this.resultService.satResults = []

  //   this.agentService.agents.forEach( (agent, index) => {
  //     agent.values.forEach( (attributeValue, id) => {
  //       let firstAttribute :Attribut = this.agentService.attributes[id];
  //       if (firstAttribute.comparisonType[0]) {
  //         if(this.checkSmaller(attributeValue, firstAttribute.perfectValue)){
  //           agent.points++;
  //         }
  //       } else if (firstAttribute.comparisonType[1]) {
  //         if(this.checkGreater(attributeValue, firstAttribute.perfectValue)){
  //           agent.points++;
  //         }
  //       } else {
  //         if(this.checkEquals(attributeValue, firstAttribute.perfectValue)){
  //           agent.points++;
  //         }
  //       }
  //     });
  //     console.log(agent.name + ": " + agent.points);
  //     this.resultService.satResults.push( new Result(agent.name, agent.points));
  //   });
  // }

  checkSmaller(value1: any, value2: any) :boolean {
    return +value1 < +value2;
  }

  checkGreater(value1: any, value2: any): boolean {
    return +value1 > +value2;
  }

  checkEquals(value1: any, value2: any): boolean {
    return value1 == value2;
  }

  ngOnInit() {
  }

}
