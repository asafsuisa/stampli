import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DrowerElement } from './drower.modal';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public inputData = '2;1;gender;SELECT;Male,Female\n' +
    '1;1;First Name;TEXT_INPUT;Enter your first name\n' +
    '2;2;marital status;SELECT;Single,Maried,Divorced \n' +
    '1;2;Last Name;TEXT_INPUT;Enter your last name';
  public drowersElements: DrowerElement[] = [];
  public maxCol = 0;
  public maxRow = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    if (this.inputData) {
      const elements: DrowerElement[] = [];
      this.inputData.split('\n').forEach(el => {
        const buildEl = this.buildElement(el);
        if (buildEl) {
          elements.push(buildEl);
        }
      });
      this.drowersElements = elements;
    }
  }

  private buildElement(el: string) {
    if (el) {
      const elementData: string[] = el.split(';');
      if (elementData.length === 5) {
        const drowerData = {} as DrowerElement;
        drowerData.row = +elementData[0];
        if (drowerData.row > this.maxRow) {
          this.maxRow = drowerData.row;
        }
        drowerData.col = +elementData[1];

        if (drowerData.col > this.maxCol) {
          this.maxCol = drowerData.col;
        }
        drowerData.label = elementData[2];
        drowerData.domType = elementData[3];
        switch (drowerData.domType) {
          case 'SELECT':
            drowerData.selectOptions = elementData[4].split(',');
            break;
          case 'TEXT_INPUT':
            drowerData.placeholder = elementData[4];
            break;
          default:
            return null;
        }

        return drowerData;
      }
    }
  }

  get arrayOfRows() {
    return Array(this.maxRow).fill(0);
  }

  get arrayOfCols() {
    return Array(this.maxCol).fill(0);
  }
}
