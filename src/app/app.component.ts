import { Component, OnInit } from '@angular/core';
import { todo } from './models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  tasklist : todo[] = []
  selectedtodo : todo | null = null 


  addtask(newtodo : todo){
    this.tasklist.push(newtodo)
    localStorage.setItem('todo' , JSON.stringify(this.tasklist))
  }

  deleteatask(taskid : number){
    this.tasklist.splice(taskid , 1)
    localStorage.setItem('todo' , JSON.stringify(this.tasklist))
  }

  markcomplete(taskid : number){
    this.tasklist[taskid].completed = true
    localStorage.setItem('todo' , JSON.stringify(this.tasklist))
  }


  selectitem(taskid: number){
    this.selectedtodo = this.tasklist[taskid]
  }

  edittask(edititem : todo){
    // @ts-ignore
    let arrayindextoreplace = this.tasklist.indexOf(this.selectedtodo)
    this.tasklist[arrayindextoreplace] = edititem
    this.selectedtodo = null;
    localStorage.setItem('todo' , JSON.stringify(this.tasklist))
  }

  ngOnInit(): void {
    const localdata = localStorage.getItem('todo')
    // console.log("localdata=" + localdata)
    if(localdata == null){
      console.log("local is null")
    }else{
      console.log("local is not null")
      let localjson = JSON.parse(localdata)
      // localjson['due'] = new Date(localjson['due'])
      this.tasklist = [...localjson]
    }
      
  }
}
