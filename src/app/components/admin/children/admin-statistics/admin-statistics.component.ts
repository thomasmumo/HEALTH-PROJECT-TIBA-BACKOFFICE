import { Component } from '@angular/core';
import { HospitalDataService } from '../../../super-admin/children/statistics/services/hospital-data.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-admin-statistics',
  templateUrl: './admin-statistics.component.html',
  styleUrl: './admin-statistics.component.css'
})
export class AdminStatisticsComponent {
  constructor(private hospitalsService:HospitalDataService){}

  hospitalRecords:{diagnosis:string,
    hospitalName?:string, 
    notes:string,
    submittedAt:string,
    submittedBy:string,
    treatment:string }[]=[];

  chart:any;
  dataSet:{label:string,data:number[],backgroundColor:string[]}={label:"",data:[0,0,0,0,0,0,0,0,0,0,0],backgroundColor:['rgb(77,166,201)','rgb(77,166,201)','rgb(77,166,201)','rgb(77,166,201)','rgb(77,166,201)','rgb(77,166,201)','rgb(77,166,201)']}
  totalHospitals:number=0;
  labels = ['HIV','CANCER','COVID19','TB','DIABETES','DEMENTIA','LUNG DESEASE'];
  
  
 
  data = {
    labels: this.labels,
    datasets: []
  }

    public config:any = {
      type:'bar',
      data:{},
      options:{
        aspectRatio:3,
        // responsive: false,
      },
      
  
    }

    ngOnInit(): void {
      let hospitalname = JSON.parse(localStorage.getItem('userObj')).hospitalName.trim().split(' ')[0]
      let hospitalname2 = JSON.parse(localStorage.getItem('userObj')).hospitalName
      
      console.log('NNNNAME: ',hospitalname)
      this.hospitalsService.getMedicalRecords().subscribe(
        (res)=>{
          this.dataSet.label=hospitalname2;
          this.hospitalRecords=res.filter(x=>x.hospitalName.toLowerCase().includes(hospitalname.toLowerCase()))
          console.log('YEAHHH: ',this.hospitalRecords)
          let index=0;
          for (let label of this.labels){
            let count =this.hospitalRecords.filter(x=>x.diagnosis.toLocaleUpperCase().includes(label)).length;
            if(count>5){this.dataSet.backgroundColor[index]='rgb(220, 20, 60)'}
            this.dataSet.data[index]=count;
            index=index+1;

          }
          this.data.datasets[0]=this.dataSet
          this.config.data=this.data;
          console.log(this.config)
          this.chart = new Chart('MyChart',this.config)
        },
        (err)=>{console.log('FROM_AD_STAT_err: ',err)}
      )
      
      
      

      
     
      
        
      }

      downloadPdf(): void {
        let hospitalname2 = JSON.parse(localStorage.getItem('userObj')).hospitalName
        this.hospitalsService.generatePdf('dc2', hospitalname2+'_TerminalIllness_Statistics.pdf');
      }

}
