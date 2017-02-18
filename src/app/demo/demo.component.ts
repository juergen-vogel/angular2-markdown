import { Component } from '@angular/core';
// import fileContent from 'raw-loader!./demo.cpp';


@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent {
  public myText = `# Headers
# H1
## H2
### H3
#### H4
##### H5
###### H6
`;
  // public fileContent = fileContent;
}
