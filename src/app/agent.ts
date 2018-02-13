import {Attribut} from './attribut';

export class Agent {
  name: string;
  values: string[];
  points: number;

  constructor(name: string) {
    this.name = name;
    this.points = 0;
    this.values = [];
  }
}