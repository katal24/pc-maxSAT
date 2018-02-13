import { Component, OnInit, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { Wizard } from "clarity-angular";
import { AgentService } from '../agent.service';
import { PcService } from '../pc.service';
import { ResultService } from '../result.service';
import { Attribut } from '../attribut';
import { Result } from '../result';
// import { Result } from '../result';

declare var jquery: any;
declare var $: any;


@Component({
  selector: 'app-pc',
  templateUrl: './pc.component.html',
  styleUrls: ['./pc.component.css']
})
export class PcComponent implements OnInit {
  @ViewChild("wizardlg") wizardLarge: Wizard;
  lgOpen: boolean = false;

  mainMatrix :number[][];
  matrixes : any[];
  comparisons : boolean = false;
  error :string = "";
  isError :boolean = false;

  constructor(public agentService: AgentService, private pcService: PcService, private resultService: ResultService) {
   
  }

  ngOnInit() {}

  setType(attribute: Attribut, nr: number) :void {
    attribute.type = [false, false, false];
    attribute.type[nr] = true;
  }
 
 
  finishComparisonType() :void {
    this.checkIfAgentsExists();
    if(!this.isError) {

    this.comparisons = true;
    this.lgOpen = false;
    this.lgOpen = true;
    this.createMainMatrix();
    this.createMatrixes();

    var slider = $("#myRange");
    var output = $("#demo");
    output.innerHTML = slider.value;

    slider.oninput = function () {
      output.innerHTML = this.value;
    }
    }
  }

  createMainMatrix() :void {
    console.log(this.mainMatrix);    
    let size = this.agentService.attributes.length;
    this.mainMatrix = [];

    for (var i: number = 0; i < size; i++) {
      this.mainMatrix.push(Array(size));

      for (var j: number = 0; j < size; j++) {
        if(i==j) {
          this.mainMatrix[i][j] = 1;
        } else {
          this.mainMatrix[i][j] = 0;
        }
      }
    }
    console.log(this.mainMatrix);    
    
  }

  createMatrixes() :void {
    this.matrixes = [];
    let size = this.agentService.attributes.length;
    let sizeAgents = this.agentService.agents.length;
    
    for (var i = 0; i < size; i++) {
      let matrix = [];
      for(var k=0; k<sizeAgents; k++){
        matrix.push(Array(sizeAgents));
        
        for (var j = 0; j < sizeAgents; j++) {
          if (k == j) {
            matrix[k][j] = 1;
          } else {
            matrix[k][j] = 0;
          }
        }
      }
      this.matrixes.push(matrix);
    }

    console.log(this.matrixes);
  }

  fillMatrices() :void {
    let size = this.matrixes.length;
    let dim = this.matrixes[0][0].length;

    for( let i=0; i<size; i++){
      if (!this.agentService.attributes[i].type[0]){      // uzupełnienie tych, które same mają się określić
        for( let r=0; r<dim; r++ ){
          for( let c=0; c<dim; c++ ){
            if(r<c){
              let value: number = +this.agentService.agents[r].values[i] / +this.agentService.agents[c].values[i];
              if (this.agentService.attributes[i].type[2]) { // bigger is better
                this.matrixes[i][r][c] = value;
              } else {    // smaller is better
                this.matrixes[i][r][c] = 1/value;
              }
            }
          }
        }
      } else {    // zamiana wartości -8,-7,...0,1,...8 na saaty 1/9, ... ,1/2, 1, 2, ... 9
        for (let r = 0; r < dim; r++) {
          for (let c = 0; c < dim; c++) {
            if (r < c) {
                this.matrixes[i][r][c] = 1/this.changeToSaatyScale(this.matrixes[i][r][c]);
            }
          }
        }
      }
    }

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (r < c) {
          this.mainMatrix[r][c] = 1/this.changeToSaatyScale(this.mainMatrix[r][c]);
        }
      }
    }

    console.log(this.matrixes);
  }

  changeToSaatyScale(value :number) :number {
    if(value>=0){
      return value+1;
    } else {
      return -1/(value-1)
    }
  }

  showMatrixes() :void {
    console.log(this.mainMatrix);    
  }
  
  checkIfAgentsExists(): void {
    if (!this.agentService.agents) {
      this.error = "No agents specified!"
      this.isError = true;
    } else if(this.agentService.agents.length == 1) {
      this.error = "Only one agent specified!"
      this.isError = true;
    }
  }

  countAhp() :void {

    this.checkIfAgentsExists();

    if(!this.isError) {
    this.fillMatrices();
    this.resultService.psResults = [];
    this.pcService.ahp(this.mainMatrix, this.matrixes).subscribe(
      result => {
        this.isError = false;
        result.values.forEach( (value, index) => {
          this.resultService.psResults.push(new Result(this.agentService.agents[index].name, value))          
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

  closeError() :void {
    this.isError = false;
  }
}



@Pipe({
  name: 'onlyToCompare'
})

export class OnlyToComparePipe implements PipeTransform {
  transform(attrs: Array<Attribut>): Array<Attribut> {
    return attrs.filter(attr => attr.type[0] == true);
  }
}