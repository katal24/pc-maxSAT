import { Component, OnInit, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { Wizard } from "clarity-angular";
import { AgentService } from '../agent.service';
import { PcService } from '../pc.service';
import { ResultService } from '../result.service';
import { DictionaryService } from '../dictionary.service';
import { MaxsatService } from '../maxsat.service';
import { Attribut } from '../attribut';
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
  error: string = "";
  isError: boolean = false;

  constructor(public agentService: AgentService, private resultService: ResultService, private dictionaryService: DictionaryService, private maxsatService: MaxsatService) {
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

  countIdealAgentModel() : number[][] {
    var idealAgentModel : number[] = [];

    for(let i=1; i<this.dictionaryService.dictionary.size+1; i++ ) {
      idealAgentModel.push(-i);
    }
    
    this.agentService.attributes.forEach( attr => {
      var keys = this.getKeysFromDictionary();

      attr.perfectValues.forEach( perfectValue => {
        if (keys.indexOf(perfectValue) != -1 ) {
          let clause = this.dictionaryService.dictionary.get(perfectValue);
          idealAgentModel = this.deleteItemFromArray(idealAgentModel, -clause);
          idealAgentModel.push(clause);
        } else {
          this.error = "No dictionary or ad value in ideal agent attributes!"
          this.isError = true;
        }
      })
    })

    console.log(idealAgentModel);
    return [idealAgentModel];
  }

  getKeysFromDictionary(): string[] {
    return Array.from(this.dictionaryService.dictionary.keys());
  }

  checkIfAgentsExists(): void {
    if (!this.agentService.agents) {
      this.error = "No agents specified!"
      this.isError = true;
    }
  }

  countAgentsModels(): number[][] {
    var agentsModels: number[][] = [];

    this.agentService.agents.forEach( (agent, index) => {
      agentsModels.push(new Array());
      var agentModel :string[] = [];
      var keys = this.getKeysFromDictionary();
      agent.values.forEach( value => {
        if (keys.indexOf(value) != -1) {
          let clause = this.dictionaryService.dictionary.get(value);
          agentsModels[index].push(clause);
        } else {
          this.error = "No dictionary ad value in agents' attributes!"
          this.isError = true;
        }
      });
    });

    return agentsModels;
  }

  countPerfectValues() :void {
    this.agentService.attributes.forEach ( attr => {
      attr.perfectValues = attr.perfectValue.split(";");
    })
  }

  countTheBest() {
    this.checkIfAgentsExists();
    this.countPerfectValues();
    this.resultService.satResults = []
    

    var idealAgentModel = this.countIdealAgentModel();
    var agentsModels = this.countAgentsModels();

    console.log(idealAgentModel);
    console.log(agentsModels);

    var maxsatInput :number[][][] = [idealAgentModel, agentsModels];

    if(!this.isError) {

      this.maxsatService.maxsat(maxsatInput).subscribe(
        result => {
          this.isError = false;
          result.values.forEach((value, index) => {
            this.resultService.satResults.push(new Result(this.agentService.agents[index].name, value))
          });
        },
        error => {
          console.log(error)
          this.error = error.message;
          this.isError = true;
        }
      );
    }

  }

  closeError(): void {
    this.isError = false;
  }

  ngOnInit() {
  }

}
