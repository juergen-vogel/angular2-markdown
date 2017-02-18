import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MarkdownComponent } from './markdown.component';
import { MarkdownService } from './markdown.service';
import * as marked from 'marked';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';

class MockMarkdownService extends MarkdownService {
  getSource(src: string): Observable<string> {
    return Observable.of('');
  }
}

describe('MarkdownComponent', () => {
  let fixture: ComponentFixture<MarkdownComponent>;
  let component: MarkdownComponent;
  let nativeElement: any;
  let mthService: MarkdownService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [MarkdownComponent],
      providers: [
        { provide: MarkdownService, useClass: MockMarkdownService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    mthService = TestBed.get(MarkdownService);
    fixture = TestBed.createComponent(MarkdownComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  describe('ngAfterViewInit', () => {

    it('should call handleSrc method when src is provided', () => {

      spyOn(component, 'handleSrc');

      component.src = './src-example/file.md';
      component.ngAfterViewInit();

      expect(component.handleSrc).toHaveBeenCalled();
    });

    it('should call handleRaw method when src is not provided', () => {

      spyOn(component, 'handleRaw');

      const mockElement = { nativeElement: { innerHTML: 'inner-html' } };

      component.element = mockElement;
      component.src = undefined;
      component.ngAfterViewInit();

      expect(component.handleRaw).toHaveBeenCalledWith(mockElement.nativeElement.innerHTML);
    });
  });

  describe('ngOnChanges', () => {

    it('should call handleSrc method when src is changed', () => {

      spyOn(component, 'handleSrc');

      const mockSimpleChanges = { src: null };

      component.ngOnChanges(mockSimpleChanges);

      expect(component.handleSrc).toHaveBeenCalled();
    });

    it('should not call handleSrc method when src is unchanged', () => {

      spyOn(component, 'handleSrc');

      const mockSimpleChanges = {};

      component.ngOnChanges(mockSimpleChanges);

      expect(component.handleSrc).not.toHaveBeenCalled();
    });
  });

  describe('handleSrc', () => {

    it('should call getSource from MarkdownService', () => {

      const mockGetSource = { subscribe: () => null };

      spyOn(mthService, 'getSource').and.returnValue(mockGetSource);

      const mockSrc = './src-example/file.md';

      component.src = mockSrc;
      component.handleSrc();

      expect(mthService.getSource).toHaveBeenCalledWith(mockSrc);
    });

    it('should call handleRaw according to file extension when not .md', async(() => {

      const mockRaw =  'raw-text';

      spyOn(mthService, 'getSource').and.returnValue(Observable.of(mockRaw));

      spyOn(component, 'handleRaw');

      component.src = './src-example/file.cpp';
      component.handleSrc();

      expect(component.handleRaw).toHaveBeenCalledWith('```cpp\n' + mockRaw + '\n```');
    }));

    it('should call handleRaw without file extension when .md', async(() => {

      const mockRaw =  'raw-text';

      spyOn(mthService, 'getSource').and.returnValue(Observable.of(mockRaw));

      spyOn(component, 'handleRaw');

      component.src = './src-example/file.md';
      component.handleSrc();

      expect(component.handleRaw).toHaveBeenCalledWith(mockRaw);
    }));
  });

  describe('handleRaw', () => {

    it('should set innerHTML with compiled markdown', () => {

      const raw = '### Raw';
      const markdown = '### Markdown';

      spyOn(component, 'prepare').and.returnValue(markdown);

      component.handleRaw(raw);

      expect(component.prepare).toHaveBeenCalledWith(raw);
      expect(component.element.nativeElement.innerHTML).toBe(marked(markdown));
    });

    it('should apply Prism highlight', () => {

      spyOn(Prism, 'highlightAll');

      component.handleRaw('### Raw');

      expect(Prism.highlightAll).toHaveBeenCalledWith(false);
    });
  });

  describe('prepare', () => {

    it('should return empty string when raw is null/undefined/empty', () => {

      expect(component.prepare(null)).toBe('');
      expect(component.prepare(undefined)).toBe('');
      expect(component.prepare('')).toBe('');
    });

    it('should remove leading whitespaces offset while keeping indent', () => {

      const mockRaw =  [
        '',               // wait for line with non-whitespaces
        '  * list',       // find first line with non-whitespaces to set offset
        '    * sub-list', // keep indent while removing from previous row offset
      ];

      const expected = [
        '',
        '* list',
        '  * sub-list',
      ];

      expect(component.prepare(mockRaw.join('\n'))).toBe(expected.join('\n'));
    });

    it('should return line with indent correctly', () => {

      const mockRaw =  [
        '* list',       // find first line with non-whitespaces to set offset
        '  * sub-list', // keep indent while removing from previous row offset
        '',             // keep blank line
        'Lorem Ipsum',  // keep everthing else
      ];

      const expected = [
        '* list',
        '  * sub-list',
        '',
        'Lorem Ipsum',
      ];

      expect(component.prepare(mockRaw.join('\n'))).toBe(expected.join('\n'));
    });
  });
});
