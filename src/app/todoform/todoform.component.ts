import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { todo } from '../models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-todoform',
  templateUrl: './todoform.component.html',
  styleUrls: ['./todoform.component.css']
})
export class TodoformComponent implements OnInit , OnChanges{
  @Input()
  selectedtodo : todo | null = null

  @Output()
  newtodoitem = new Subject<todo>()

  @Output()
  edititem = new Subject<todo>()

  todoForm !: FormGroup
  constructor(private fb: FormBuilder){}

  private createForm(selectedtodo : todo | null = null) : FormGroup{
    return this.fb.group({
      description : this.fb.control<string>(selectedtodo? selectedtodo.description:'' , [Validators.required , Validators.minLength(5)]),
      priority :this.fb.control<string>(selectedtodo? selectedtodo.priority:'Low' , [Validators.required]),
      due : this.fb.control<string>(selectedtodo? selectedtodo.due.toString():'', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.todoForm = this.createForm()
  }

  ngOnChanges(changes: SimpleChanges): void{
    console.log(changes)
    // console.log(this.selectedtodo)
    this.todoForm = this.createForm(this.selectedtodo)

  }

  processform(){
    if(this.selectedtodo == null){
      let newtodo = this.todoForm.value as todo
      newtodo.completed = false
      this.newtodoitem.next(newtodo)
      this.ngOnInit()
    }else{
      let edittodo = this.todoForm.value as todo
      edittodo.completed = false
      this.edititem.next(edittodo)
      this.ngOnInit()
    }

  }

  isFormValid() : boolean{
    let dd = this.todoForm.get('due')?.value
    if (!dd) {
      return true
    }else{
      const duedate = new Date(dd)
      const today = new Date()
      return this.todoForm.invalid || (duedate < today)
    }
  }

  isDueDateValid() : boolean{
    let dd = this.todoForm.get('due')?.value
    if (!dd) {
      return true
    }else{
      const duedate = new Date(dd)
      const today = new Date()
      return (duedate < today)
    } 
  }

}
