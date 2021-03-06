import { Component, OnInit } from '@angular/core';
import * as echarts from 'ngx-echarts';
import {StatusdataService} from './indexmodule.service';
import {Statusdata} from './stautsdata';
import { Project } from './project' 
import * as $ from 'jquery'
@Component({
  selector: 'app-indexmodule',
  templateUrl: './indexmodule.component.html',
  styleUrls: ['./indexmodule.component.css']
})

export class IndexmoduleComponent implements OnInit {
    public statusData:Statusdata;
    UserProjects:Project[];
    private currentproject:String;
    private changers:String;
    currentsession:Project;
    mapIntance:any;
    onMapInit(ev){//地图初始化
        var thisFunc =this;
        this.mapIntance = ev;
     }
  constructor(private statusdataService:StatusdataService) { }
 
  ngOnInit() {
    this.statusdataService.getTasksByStatus().subscribe(Statusdata=>{
   this.chartOption.series[0].data=Statusdata.weikaishi;
   this.chartOption.series[1].data=Statusdata.jinxingzhong;
   this.chartOption.series[2].data=Statusdata.yiwancheng;
   this.chartOption.series[3].data=Statusdata.yijieshu;
   this.mapIntance.setOption(this.chartOption);//更新地图数据
   this.getUserProjects();
    });
   
  }
  getUserProjects(): void{
    this.statusdataService.getUserProjects()
    .subscribe(UserProjects => this.UserProjects = UserProjects);
  }
  sendsession(){
      this.currentproject=$("#sessionproject").val();
      this.add(this.currentproject,);
  }
  add(name:String): void {
    this.statusdataService.sendprojectsession(name)
      .subscribe(changers => {
        alert("切换团队成功!");
        
      });
  }
  chartOption = {
    title: {
        text: '项目任务完成情况图'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data: ['未开始的任务', '进行中任务', '已完成任务', '已结束任务', ]
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name: '未开始任务',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
            name: '进行中任务',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '已完成任务',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: '已结束任务',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [320, 332, 301, 334, 390, 330, 320]
        },
    ]
}

}
