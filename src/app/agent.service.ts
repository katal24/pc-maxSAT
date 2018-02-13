import { Injectable } from '@angular/core';
import { Attribut } from './attribut';
import { Agent } from './agent';

@Injectable()
 export class AgentService {

  attributes : Attribut[];
  agents : Agent[];

  constructor() {
    this.attributes = [];
   }

  createAgents() :void {
    this.agents = [];        
    this.addAgent();
  }
  
  addAttribute(): void {
    let attr1 = new Attribut("", [false, false, false]);
    this.attributes.push(attr1);
  }

  addAttributeByName(name: string) :void {
    let attr1 = new Attribut(name, [false, false, false]);
    this.attributes.push(attr1);
  }

  deleteAttribute(): void {
    this.attributes.splice(this.attributes.length - 1, 1);
  }

  addAgent(): void {
    let agent = new Agent("");
    this.agents.push(agent);
  }

  deleteAgent(): void {
    this.agents.splice(this.agents.length - 1, 1);
  }
}
