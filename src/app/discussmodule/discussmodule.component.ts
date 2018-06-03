import { Component, OnInit } from '@angular/core';
import { TaskConfirm } from './TaskConfirm'  
import { DiscussmoduleService } from './discussmodule.service';
@Component({
  selector: 'app-discussmodule',
  templateUrl: './discussmodule.component.html',
  styleUrls: ['./discussmodule.component.css']
})
export class DiscussmoduleComponent implements OnInit {
  private taskconfirms:TaskConfirm[];
  private content:String
  private updaters:String
  constructor(private DiscussmoduleService: DiscussmoduleService) { }
  isUpdateTR=1; 
  ngOnInit() {
    this.getTaskconfirms();
  }
  getTaskconfirms(): void {
    this.DiscussmoduleService.getTaskConfirms()
      .subscribe(taskconfirms => this.taskconfirms = taskconfirms);
  }
  showcontent(content1){
    this.content=content1.content;
   }
   update(i){
       this.taskconfirms[i].isUpdateModel=true;
     }
   cancelupdate(i){
      this.taskconfirms[i].isUpdateModel=false;
     }
   delete(i){
         this.taskconfirms.splice(i,1);
         this.DiscussmoduleService.deleteTaskConfirms(this.taskconfirms[i].id);
   }
  updateConfrim(i){
  this.taskconfirms[i].isUpdateModel=false;
  this.DiscussmoduleService.updateTaskConfirms(this.taskconfirms[i])
  .subscribe(updaters => {
    // replace the hero in the heroes list with update from server
   alert("修改成功!");
  });
  }
}