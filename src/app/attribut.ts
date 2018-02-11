export class Attribut {
  name: string;
  type: boolean[];
  comparisonType: boolean[];
  perfectValue: string;
  perfectValues: string[];

  constructor(name: string, type: boolean[]) {
    this.name = name;
    this.type = type;
    this.comparisonType = [false, false, false]
    this.perfectValues = [];
    this.perfectValue = "";
  }
}