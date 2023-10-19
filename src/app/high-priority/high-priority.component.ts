import { Component, OnInit } from '@angular/core';

import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface MiToDo {
  inputValue: string;
  position: number;
  symbol: string;
}

const ELEMENT_DATA: MiToDo[] = [
  { position: 1, inputValue: '', symbol: 'H' }
];

@Component({
  selector: 'app-high-priority',
  templateUrl: './high-priority.component.html',
  styleUrls: ['./high-priority.component.scss']
})
export class HighPriorityComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  displayedColumns: string[] = ['inputValue', 'symbol'];
  dataToDisplay = [...ELEMENT_DATA];

  dataSource = new TodoDataSource(this.dataToDisplay);

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.dataSource.connect().subscribe(data => {
      // data.forEach((item, index) => {
      //   this.form.setControl('todos', item.value);
      // })
    });
    //throw new Error('Method not implemented.');
  }

  addData() {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataToDisplay = [...this.dataToDisplay, ELEMENT_DATA[randomElementIndex]];
    this.dataSource.setData(this.dataToDisplay);
  }

  removeData() {
    this.dataToDisplay = this.dataToDisplay.slice(0, -1);
    this.dataSource.setData(this.dataToDisplay);
  }

}

class TodoDataSource extends DataSource<MiToDo> {
  private _dataStream = new ReplaySubject<MiToDo[]>();

  constructor(initialData: MiToDo[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<MiToDo[]> {
    return this._dataStream;
  }

  disconnect() { }

  setData(data: MiToDo[]) {
    this._dataStream.next(data);
  }
}
