"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var marked = require('marked');
var markdown_service_1 = require('./markdown.service');
require('prismjs/prism');
require('prismjs/components/prism-c');
require('prismjs/components/prism-java');
require('prismjs/components/prism-cpp');
require('prismjs/components/prism-python');
require('prismjs/components/prism-perl');
require('prismjs/components/prism-php');
require('prismjs/components/prism-scss');
require('prismjs/components/prism-diff');
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});
var MarkdownComponent = (function () {
    function MarkdownComponent(mdService, el, http) {
        this.mdService = mdService;
        this.el = el;
        this.http = http;
    }
    MarkdownComponent.prototype.ngOnInit = function () {
    };
    /**
     * on path input change
     */
    MarkdownComponent.prototype.ngOnChanges = function () {
        this.getContent();
    };
    /**
     *
     */
    MarkdownComponent.prototype.ngAfterViewInit = function () {
        if (!this.path) {
            this.md = this.prepare(this.el.nativeElement.innerHTML);
            this.el.nativeElement.innerHTML = marked(this.md);
            Prism.highlightAll(false);
        }
        else {
            this.getContent();
        }
    };
    /**
     * get remote conent;
     */
    MarkdownComponent.prototype.getContent = function () {
        var _this = this;
        if (!!this.path) {
            this.ext = this.path.split('.').splice(-1).join();
        }
        this.mdService.getContent(this.path)
            .subscribe(function (data) {
            _this.md = _this.ext !== 'md' ? '```' + _this.ext + '\n' + data + '\n```' : data;
            _this.el.nativeElement.innerHTML = marked(_this.prepare(_this.md));
            Prism.highlightAll(false);
        }, function (err) { return _this.handleError; });
    };
    /**
     * catch http error
     */
    MarkdownComponent.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    /**
     * Prepare string
     */
    MarkdownComponent.prototype.prepare = function (raw) {
        var _this = this;
        if (!raw) {
            return '';
        }
        if (this.ext === 'md' || !this.path) {
            var isCodeBlock_1 = false;
            return raw.split('\n').map(function (line) {
                if (_this.trimLeft(line).substring(0, 3) === "```") {
                    isCodeBlock_1 = !isCodeBlock_1;
                }
                return isCodeBlock_1 ? line : line.trim();
            }).join('\n');
        }
        return raw;
    };
    /**
     * Trim left whitespace
     */
    MarkdownComponent.prototype.trimLeft = function (line) {
        return line.replace(/^\s+|\s+$/g, '');
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MarkdownComponent.prototype, "path");
    MarkdownComponent = __decorate([
        core_1.Component({
            selector: 'markdown,[Markdown]',
            template: '<ng-content></ng-content>',
            styles: [
                ".token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string {\n            background: none;\n        }"
            ]
        }), 
        __metadata('design:paramtypes', [markdown_service_1.MarkdownService, core_1.ElementRef, http_1.Http])
    ], MarkdownComponent);
    return MarkdownComponent;
}());
exports.MarkdownComponent = MarkdownComponent;
