import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MarkdownComponent } from './markdown.component';
import { MarkdownService } from './markdown.service';
import { MarkdonwConfig } from './markdown.config';

@NgModule({
  exports: [MarkdownComponent],
  imports: [HttpModule],
  declarations: [MarkdownComponent],
  providers: [MarkdownService],
})
export class MarkdownModule {

}
