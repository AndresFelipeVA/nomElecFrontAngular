import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FileoperationService {

  constructor(private mHttpClient:HttpClient) { }


  GenerateXMLFile(company:string, instance:string) {
    return this.mHttpClient.get('http://localhost:9091/api/v1/nomiIndi/xmlAll/' + company);
  }
  
  GenerateJSONFile(company:string, instance:string) {
    return this.mHttpClient.get('http://localhost:9092/nomiIndi/json/' + company);
  }
  
  DownloadXMLFile(company:string, instance:string) {
    return this.mHttpClient.get('http://localhost:9091/api/v1/nomiIndi/downloadXmlAll/' + company);
  }
  
  DownloadJSONFile(company:string, instance:string) {
    return this.mHttpClient.get('http://localhost:9092/nomiIndi/json/download/' + company);
  }

}