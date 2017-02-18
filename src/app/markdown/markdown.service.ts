import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MarkdownService {

  constructor(private http: Http) { }

  getContent(path: string):Observable<any> {
    return this.http.get(path);
  }
}
