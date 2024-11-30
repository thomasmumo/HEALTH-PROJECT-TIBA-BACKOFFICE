import { Injectable } from '@angular/core';
import { StaffService } from '../admin-home/adminHomeServices/staff.service';

@Injectable({
  providedIn: 'root'
})
export class AllStaffService {

  constructor(private allStaffServivce:StaffService) { }
  
  deleteStaff(id:number){}
}
