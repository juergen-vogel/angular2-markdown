import { Http } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
export declare class MarkdownService {
    private http;
    constructor(http: Http);
    getContent(path: string): Observable<any>;
}
