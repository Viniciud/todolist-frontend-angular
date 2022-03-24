import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SimpleStorageService {

  constructor() {}

  setData(keyName: string, data: any) {
    localStorage.setItem(keyName, JSON.stringify(data));
  }

  getData(key: string = ''): any {
    let item: any = localStorage.getItem(key);
    let dataObject: any = JSON.parse(item);
    return dataObject;
  }

  cleanData(keyToRemove: string) {
    localStorage.removeItem(keyToRemove);
  }
}
