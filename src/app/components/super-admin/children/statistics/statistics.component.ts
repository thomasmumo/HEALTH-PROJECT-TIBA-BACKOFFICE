import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { HospitalDataService } from './services/hospital-data.service';

Chart.register(...registerables);

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit {
  constructor(private hospitalsService:HospitalDataService){}
  hospitals:{
    diagnosis:string,
    hospitalName?:string, 
    notes:string,
    submittedAt:string,
    submittedBy:string,
    treatment:string
   }[]=[];


  chart:any;
  dataSets:{label:string,data:number[],backgroundColor:string[]}[]=[];
  totalHospitals:number=0;
  labels = ['HIV','CANCER','TB','COVID19','DIABETES','DEMNTIA','LUNG DESEASE'];
  data = {
    labels: this.labels,
    datasets: [],
  }

    public config:any = {
      type:'bar',
      data:{},
      options:{
        aspectRatio:2.3,
        maintainAspectRatio: true,
      },
      
  
    }

    ngOnInit(): void {
      this.hospitalsService.getMedicalRecords().subscribe(
        (res)=>{
          console.log('MEDICAL-RECORDS: ',res)
          this.hospitals=res;
          console.log('NEW-RECORDS: ',this.hospitals)
          for (let h of this.hospitals){
            let newObj={label:h.hospitalName,data:[0,0,0,0,0,0,0,0,0,0,0],backgroundColor:['rgb(77,166,201)','rgb(77,166,201)','rgb(77,166,201)','rgb(77,166,201)','rgb(77,166,201)','rgb(77,166,201)','rgb(77,166,201)','rgb(77,166,201)','rgb(77,166,201)','rgb(77,166,201)','rgb(77,166,201)',]}
            if(this.dataSets.length===0 ){
              let targetHosptalData = this.hospitals.filter(hos=>hos.hospitalName===h.hospitalName);
              let targetHospitalHivDataCount =targetHosptalData.filter(x=>x.diagnosis.toLocaleUpperCase().includes('HIV')).length;
              let targetHospitalCancerDataCount =targetHosptalData.filter(x=>x.diagnosis.toLocaleUpperCase().includes('CANCER')).length;
              let targetHospitalTbDataCount =targetHosptalData.filter(x=>x.diagnosis.toLocaleUpperCase().includes('TB')).length;
              let targetHospitalCovidDataCount =targetHosptalData.filter(x=>x.diagnosis.toLocaleUpperCase().includes('COVID19')).length;
              let targetHospitalDiabetesDataCount =targetHosptalData.filter(x=>x.diagnosis.toLocaleUpperCase().includes('DIABETES')).length;
              let targetHospitalDementiaDataCount =targetHosptalData.filter(x=>x.diagnosis.toLocaleUpperCase().includes('DEMNTIA')).length;
              let targetHospitalLungDataCount =targetHosptalData.filter(x=>x.diagnosis.toLocaleUpperCase().includes('LUNG DESEASE')).length;
              newObj.data[0]=targetHospitalHivDataCount;
              if(targetHospitalHivDataCount>3){newObj.backgroundColor[0]='red'}
              newObj.data[1]=targetHospitalCancerDataCount;
              if(targetHospitalCancerDataCount>3){newObj.backgroundColor[1]='red'}
              newObj.data[2]=targetHospitalTbDataCount;
              if(targetHospitalTbDataCount>3){newObj.backgroundColor[2]='red'}
              newObj.data[3]=targetHospitalCovidDataCount;
              if(targetHospitalCovidDataCount>3){newObj.backgroundColor[3]='red'}
              newObj.data[4]=targetHospitalDiabetesDataCount;
              if(targetHospitalDiabetesDataCount>3){newObj.backgroundColor[4]='red'}
              newObj.data[5]=targetHospitalDementiaDataCount;
              if(targetHospitalDementiaDataCount>3){newObj.backgroundColor[5]='red'}
              newObj.data[6]=targetHospitalLungDataCount;
              if(targetHospitalLungDataCount>3){newObj.backgroundColor[6]='red'}
              this.dataSets = [newObj]
              
            }else if(this.dataSets.length!=0 && this.dataSets.some(hos=>hos.label===h.hospitalName)){
              continue
            }else{
              let targetHosptalData = this.hospitals.filter(hos=>hos.hospitalName===h.hospitalName);
              let targetHospitalHivDataCount =targetHosptalData.filter(x=>x.diagnosis.toLocaleUpperCase().includes('HIV')).length;
              let targetHospitalCancerDataCount =targetHosptalData.filter(x=>x.diagnosis.toLocaleUpperCase().includes('CANCER')).length;
              let targetHospitalTbDataCount =targetHosptalData.filter(x=>x.diagnosis.toLocaleUpperCase().includes('TB')).length;
              let targetHospitalCovidDataCount =targetHosptalData.filter(x=>x.diagnosis.toLocaleUpperCase().includes('COVID19')).length;
              let targetHospitalDiabetesDataCount =targetHosptalData.filter(x=>x.diagnosis.toLocaleUpperCase().includes('DIABETES')).length;
              let targetHospitalDementiaDataCount =targetHosptalData.filter(x=>x.diagnosis.toLocaleUpperCase().includes('DEMNTIA')).length;
              let targetHospitalLungDataCount =targetHosptalData.filter(x=>x.diagnosis.toLocaleUpperCase().includes('LUNG DESEASE')).length;
              newObj.data[0]=targetHospitalHivDataCount;
              if(targetHospitalHivDataCount>3){newObj.backgroundColor[0]='red'}
              newObj.data[1]=targetHospitalCancerDataCount;
              if(targetHospitalCancerDataCount>3){newObj.backgroundColor[1]='red'}
              newObj.data[2]=targetHospitalTbDataCount;
              if(targetHospitalTbDataCount>3){newObj.backgroundColor[2]='red'}
              newObj.data[3]=targetHospitalCovidDataCount;
              if(targetHospitalCovidDataCount>3){newObj.backgroundColor[3]='red'}
              newObj.data[4]=targetHospitalDiabetesDataCount;
              if(targetHospitalDiabetesDataCount>3){newObj.backgroundColor[4]='red'}
              newObj.data[5]=targetHospitalDementiaDataCount;
              if(targetHospitalDementiaDataCount>3){newObj.backgroundColor[5]='red'}
              newObj.data[6]=targetHospitalLungDataCount;
              if(targetHospitalLungDataCount>3){newObj.backgroundColor[6]='red'}
              this.dataSets = [...this.dataSets,newObj]
            }
              
    
           console.log('DATSET',this.dataSets)
          
            
          }
         
          this.data.datasets=this.dataSets
          this.config.data=this.data;
          console.log('DATAA: ',this.config)
          this.chart = new Chart('MyChart',this.config)

        },
        (err)=>{console.log('MEDICAL-RECORDS-err: ',err)},
      )
      
      
      
      // console.log(this.dataSets)
      // this.data.datasets=this.dataSets
      

      
     
      
        
      }
      downloadPdf(): void {
        this.hospitalsService.generatePdf('dc', 'my-document.pdf');
      }


      
      
     
    

}
