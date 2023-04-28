import { Component, Input, Output } from '@angular/core';
import { todo } from '../models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent {

  @Input()
  todolist : todo[] = []


  @Output()
  ondelete = new Subject<number>()

  @Output()
  oncompleted = new Subject<number>()

  @Output()
  selectedtodo = new Subject<number>()


  deletetodo(todoindex : number){
    // console.log(todoindex)
    this.ondelete.next(todoindex)
  }

  markcompleted(todoindex : number){
    this.oncompleted.next(todoindex)
  }

  edititem(todoindex : number){
    this.selectedtodo.next(todoindex)  

  }

}
