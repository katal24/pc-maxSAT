import { Component, OnInit, Pipe, PipeTransform  } from '@angular/core';
import { ResultService } from '../result.service';
import { AgentService } from '../agent.service';
import { Result } from '../result';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor( private resultService: ResultService, private agentService: AgentService) { }

  ngOnInit() {
  }

}



@Pipe({
  name: 'sortByResult'
})

export class SortByResultPipe implements PipeTransform {
  transform(agents: Array<Result>): Array<Result> {
    agents.sort((a: Result, b: Result) => {
      if (a.value < b.value) {
        return 1;
      } else if (a.value > b.value) {
        return -1;
      } else {
        return 0;
      }
    });
    return agents;
  }
}