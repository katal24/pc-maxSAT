import { Component, OnInit } from '@angular/core';
import { AgentService } from '../agent.service';
import { Attribut} from '../attribut';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent implements OnInit {

  attributes : string[];
  constructor(public agentService: AgentService ) { 
  }

  ngOnInit() {
  }

  addAttribute(): void {
    this.agentService.addAttribute();
  }

  deleteAttribute(): void {
    this.agentService.deleteAttribute();
  }

  finishAttributes() :void {
    this.validateAttributes();
    this.createAgents();
  }

  validateAttributes() :void {
  }

  validateAgents() :void {
  }

  createAgents() :void {
    this.agentService.createAgents();
  }

  addAgent(): void {
    this.agentService.addAgent();
  }

  deleteAgent(): void {
    this.agentService.deleteAgent();
  }

  finishAgents(): void {
    this.validateAgents();
  }

}
