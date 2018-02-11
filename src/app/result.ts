export class Result {
  error: string;
  type: string;
  values: number[];
  value: number
  name: string;

  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}