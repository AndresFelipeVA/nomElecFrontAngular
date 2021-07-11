import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { FileDownload } from './models/file-download.model';
import { FileoperationService } from './services/fileoperation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Nomina Electronica';
  // companies = ["01", "02", "03"];
  // instances = ["NOMUSD01", "NOMUSD02"];
  operations = ["Generar XML", "Generar JSON", "Generar y descargar XML", "Generar y descargar JSON"];

  company = "";
  instance = "";
  cargando = false;

  constructor(private mOperation: FileoperationService) { }

  ngOnInit() {

  }

  guardar(mForm: NgForm) {
    if (mForm.invalid) {
      Object.values(mForm.controls).forEach(campo => campo.markAsTouched());
      return;
    }

    this.company=mForm.controls.company.value.toUpperCase();
    this.instance=mForm.controls.instance.value.toUpperCase();
    this.cargando=true;

    switch (mForm.controls.operation.value) {
      case 'Generar XML':
        this.GenerateXMLFile();
        break;

      case 'Generar JSON':
        this.GenerateJSONFile();
        break;

      case 'Generar y descargar XML':
        this.DownloadXMLFile();
        break;

      case 'Generar y descargar JSON':
        this.DownloadJSONFile();
        break;

      default:
        break;
    }

  }


  GenerateXMLFile() { 
    this.mOperation.GenerateXMLFile(this.company, this.instance).subscribe(
      (resp) => {
        this.display("Archivo XML Creado exitosamente", 'success');
      },
      (error) => {
        this.display("Problemas en la generación del archivo XML", 'error');
      }
    );
  }

  GenerateJSONFile() {
    this.mOperation.GenerateJSONFile(this.company, this.instance).subscribe(
      (resp) => {
        this.display("Archivo JSON Creado exitosamente", 'success');
      },
      (error) => {
        this.display("Problemas en la generación del archivo JSON", 'error');
      }
    );
  }
  
  DownloadXMLFile() {
    this.mOperation.DownloadXMLFile(this.company, this.instance).subscribe(
      (resp: FileDownload) => {
        this.display("Archivo XML Creado exitosamente", 'success');
        this.download(resp);
      },
      (error) => {
        this.display("Problemas en la generación/descarga del archivo XML", 'error');
      }
    );
  }
  
  DownloadJSONFile() {
    this.mOperation.DownloadJSONFile(this.company, this.instance).subscribe(
      (resp: FileDownload) => {
        this.display("Archivo JSON Creado exitosamente", 'success');
        this.download(resp);
      },
      (error) => {
        this.display("Problemas en la generación/descarga del archivo JSON", 'error');
      }
    );
  }

  download(resp: FileDownload) {
    console.log("Descargando");
    let a = document.createElement("a");
          a.href = URL.createObjectURL(resp.file);
          a.download = (resp.fileName);
          a.click();
  }

  display(mensaje: string, tipo: SweetAlertIcon)
  {
    console.log(mensaje);
    this.cargando=false;
    Swal.fire({
      icon: tipo,
      text: mensaje,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0d6efd'
    });
  }

}