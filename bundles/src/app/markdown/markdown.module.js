"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var markdown_component_1 = require('./markdown.component');
var markdown_service_1 = require('./markdown.service');
var MarkdownModule = (function () {
    function MarkdownModule() {
    }
    MarkdownModule.forRoot = function () {
        return {
            ngModule: MarkdownModule
        };
    };
    MarkdownModule = __decorate([
        core_1.NgModule({
            exports: [markdown_component_1.MarkdownComponent],
            imports: [http_1.HttpModule],
            declarations: [markdown_component_1.MarkdownComponent],
            providers: [markdown_service_1.MarkdownService]
        })
    ], MarkdownModule);
    return MarkdownModule;
}());
exports.MarkdownModule = MarkdownModule;
