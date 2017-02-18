import { ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import { MarkdownService } from './markdown.service';
import 'prismjs/prism';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-perl';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-diff';
export declare class MarkdownComponent implements OnInit, AfterViewInit {
    private mdService;
    private el;
    private http;
    path: string;
    private md;
    private ext;
    constructor(mdService: MarkdownService, el: ElementRef, http: Http);
    ngOnInit(): void;
    /**
     * on path input change
     */
    ngOnChanges(): void;
    /**
     *
     */
    ngAfterViewInit(): void;
    /**
     * get remote conent;
     */
    getContent(): void;
    /**
     * catch http error
     */
    private handleError(error);
    /**
     * Prepare string
     */
    prepare(raw: any): any;
    /**
     * Trim left whitespace
     */
    trimLeft(line: string): string;
}
