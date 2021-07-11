import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
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
        window.alert("Archivo XML Creado exitosamente");
        console.log("Archivo XML Creado exitosamente");
        this.cargando=false;
      },
      (error) => {
        window.alert("Problemas en la generación del archivo XML");
        console.log("Problemas en la generación del archivo XML");
        this.cargando=false;
      }
    );
  }

  GenerateJSONFile() {
    this.mOperation.GenerateJSONFile(this.company, this.instance).subscribe(
      (resp) => {
        window.alert("Archivo JSON Creado exitosamente");
        console.log("Archivo JSON Creado exitosamente");
        this.cargando=false;
      },
      (error) => {
        window.alert("Problemas en la generación del archivo JSON");
        console.log("Problemas en la generación del archivo JSON");
        this.cargando=false;
      }
    );
  }
  
  DownloadXMLFile() {
    this.mOperation.DownloadXMLFile(this.company, this.instance).subscribe(
      (resp) => {
        window.alert("Archivo XML Creado exitosamente");
        console.log("Archivo XML Creado exitosamente");
        this.download(resp);
      },
      (error) => {
        window.alert("Problemas en la generación/descarga del archivo XML");
        console.log("Problemas en la generación/descarga del archivo XML");
        this.cargando=false;
      }
    );
  }
  
  DownloadJSONFile() {
    this.mOperation.DownloadJSONFile(this.company, this.instance).subscribe(
      (resp) => {
        window.alert("Archivo JSON Creado exitosamente");
        console.log("Archivo JSON Creado exitosamente");
        this.download(resp);
      },
      (error) => {
        window.alert("Problemas en la generación/descarga del archivo JSON");
        console.log("Problemas en la generación/descarga del archivo JSON");
        this.cargando=false;
      }
    );
  }

  download(resp: Blob) {
    console.log("Descargando");
    let a = document.createElement("a");
          a.href = URL.createObjectURL(resp);
          a.download = (this.company + "-" + this.instance);
          a.click();
          this.cargando=false;
  }

}



