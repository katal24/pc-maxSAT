import { Component, OnInit, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { Wizard } from "clarity-angular";
import { AgentService } from '../agent.service';
import { PcService } from '../pc.service';
import { ResultService } from '../result.service';
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

  constructor(private agentService: AgentService, private resultService: ResultService) {
  }

  setTypeOfComparison(attribute: Attribut, nr: number): void {
    attribute.comparisonType = [false, false, false];
    attribute.comparisonType[nr] = true;
  }

  countTheBest(){
    this.resultService.satResults = []
    // firstAttribute: Attribut = new Attribut();
    this.agentService.agents.forEach( (agent, index) => {
      agent.values.forEach( (attributeValue, id) => {
        let firstAttribute :Attribut = this.agentService.attributes[id];
        if (firstAttribute.comparisonType[0]) {
          if(this.checkSmaller(attributeValue, firstAttribute.perfectValue)){
            agent.points++;
          }
        } else if (firstAttribute.comparisonType[1]) {
          if(this.checkGreater(attributeValue, firstAttribute.perfectValue)){
            agent.points++;
          }
        } else {
          if(this.checkEquals(attributeValue, firstAttribute.perfectValue)){
            agent.points++;
          }
        }
      });
      console.log(agent.name + ": " + agent.points);
      this.resultService.satResults.push( new Result(agent.name, agent.points));
    });
  }

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
