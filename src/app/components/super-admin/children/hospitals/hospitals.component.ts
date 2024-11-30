import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from '../home/admin.service';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrl: './hospitals.component.css'
})
export class HospitalsComponent implements OnInit{
  

  searchControl = new FormControl();
  hospitalName = new FormControl();
  hospitalContact = new FormControl();
  hospitalLocation = new FormControl();
  filteredHosptals:Observable<{id:number,name:string,location:string,admin:string}[]>;
  hospitals:{id:number,name:string,location:string,admin:string}[]=[];
  searchedHospital:string='';
  showUpdateForm:boolean=false;
  showDeleteContainer:boolean=false;

  constructor(private hospitalService:AdminService){}

  ngOnInit(): void {
    this.filteredHosptals = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    )
    
  }
  private _filter(value:string):{id:number,name:string,location:string,admin:string}[]{
    const filterValue=value.toLowerCase();
    return this.hospitals.filter(hos => hos.name.toLowerCase().includes(filterValue))
  }

  searchsubmit(){

    this.searchedHospital=this.searchControl.value;
  }
  showUpdate_Form(hospital?:any){
    this.showUpdateForm=!this.showUpdateForm;
    this.hospitalName.setValue(hospital.name)
    this.hospitalLocation.setValue(hospital.location)
    this.hospitalContact.setValue('07xx')
  }

  updateFormSubmit(){}

  showDelete_container(){
    this.showDeleteContainer=!this.showDeleteContainer;
  }



}
