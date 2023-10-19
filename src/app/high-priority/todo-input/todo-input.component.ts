import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss']
})
export class TodoInputComponent implements OnInit {

  @Input() inputValue: string = '';
  inputForm:FormGroup = this.formBuilder.group({
    inputValue: ['', [Validators.required]]
  })

  constructor(private formBuilder: FormBuilder) { 
  }
  ngOnInit(): void {
    this.inputForm 
  }

  onInputChange(event: any) {
    this.inputValue = event.target.value;
  }

  onSubmit() {
    console.log(this.inputForm.value);
  }

}
