import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class HospitalDataService {

  constructor(private http:HttpClient) { }
  
  
  getMedicalRecords():Observable<any>{
    return this.http.get('https://tiba-188778242087.us-central1.run.app/api/open/all_medicalRecords')
  }


  generatePdf(elementId: string, filename: string = 'document.pdf'): void {
    const element = document.getElementById(elementId);

    if (!element) {
      console.error(`Element with ID "${elementId}" not found!`);
      return;
    }

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      pdf.save(filename);
    });
  }
}
