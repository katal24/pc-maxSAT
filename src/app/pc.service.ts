import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map'
import { Result } from './result';

@Injectable()
export class PcService {

  constructor(private http: HttpClient) { }
  serverAddress: string = "http://localhost:8080/pc";

  ahp(mainMatrix: number[][], matrixes: any[]): Observable<Result> {
    let oneMatrix = this.buildOneMatrix(mainMatrix, matrixes);
    return this.http.post<Result>(this.serverAddress, {"name": "ahp", "matrix": oneMatrix});
  }

  buildOneMatrix(mainMatrix: number[][], matrixes: any[]) : number[][] {
    let matrix = [];

    for(let i=0; i<mainMatrix.length; i++){
      for(let j=0; j<mainMatrix[0].length; j++){
        if(j>i) mainMatrix[j][i] = 1/mainMatrix[i][j];
      }
    }

    matrixes.forEach(matrix => {
      for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
          if (j > i) matrix[j][i] = 1/matrix[i][j];
        }
      }
    });

    mainMatrix.forEach(m => matrix.push(m));
    matrixes.forEach(mat => mat.forEach(m => matrix.push(m)));
    return matrix;
  }

}
