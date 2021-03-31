import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable, of } from 'rxjs';
import { getRandomText } from '../utils/randomTextGenerator';
import { combineAll, map } from 'rxjs/operators';
import { DataItem } from '../models/data';

@Injectable({
  providedIn: 'root'
})
export class FakeDataService implements InMemoryDbService {

  constructor(private injector: Injector) { }

  createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
    const columnsNumber = 100;
    const rowsNumber = 6000;

    const tableData: DataItem[] = [];
    for (let r = 0; r < rowsNumber; r++) {
      const obj = { id: (r + 1) } as DataItem;
      for (let c = 1; c < columnsNumber; c++) {
        obj['column' + (c + 1)] = getRandomText();
      }
      tableData.push(obj);
    }

    const users = [ { id: 1, username: 'admin', password: 'admin' }];

    return { tableData, users };
  }

  get(reqInfo: RequestInfo): any {
    if (reqInfo.id === 'loggedIn') {
      return reqInfo.utils.createResponse$(() => {
        const coll = reqInfo.collection[0];
        const { headers, url } = reqInfo;
        const request = reqInfo.req as any;
        if (request.headers.get('Authorization') === 'Bearer null') {
          return { status: 401, body: {}, headers, url };
        } else {
          return { status: 200, body: { id: coll.id, username: coll.username, headers, url } };
        }
      });
    }
  }

  post(reqInfo: RequestInfo): any {
    if (reqInfo.id === 'logIn') {
      return reqInfo.utils.createResponse$(() => {
        const { headers, url } = reqInfo;
        const coll = reqInfo.collection as any[];
        const req = reqInfo.req as any;
        const user = coll.find(x => x.username === req.body.username && x.password === req.body.password);
        if (user) {
          return { status: 200, body: { user: { id: user.id, usernamre: user.username }, token: '123456789' }, headers, url };
        } else {
          return { status: 400, body: { message: 'Username or password not correct' }, headers, url};
        }
      });
    }
  }
}
