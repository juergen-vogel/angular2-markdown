import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
export declare class MarkdownService {
    private http;
    constructor(http: Http);
    getContent(path: string): Observable<any>;
    extractData(response: Response): string;
    handleError(error: Response | any): ErrorObservable<string>;
}
