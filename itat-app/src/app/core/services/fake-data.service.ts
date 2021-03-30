import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { getRandomText } from '../utils/randomTextGenerator';

@Injectable({
  providedIn: 'root'
})
export class FakeDataService implements InMemoryDbService {

  constructor() { }

  createDb(): {} | Observable<{}> | Promise<{}> {
    const columnsNumber = 100;
    const rowsNumber = 6000;

    const tableData = [];
    for (let r = 0; r < rowsNumber; r++) {
      const obj = { id: (r + 1) } as any;
      for (let c = 1; c < columnsNumber; c++) {
        obj['column' + (c + 1)] = getRandomText();
      }
      tableData.push(obj);
    }

    return { tableData };
  }
}
