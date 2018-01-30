import {Attribut} from './attribut';

export class Agent {
  name: string;
  // attributes: Attribut[];
  values: string[];
  points: number;

  constructor(name: string) {
    this.name = name;
    this.points = 0;
    // this.attributes = attributes;
    this.values = [];
  }
}