import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FileoperationService {

  constructor(private mHttpClient:HttpClient) { }


  GenerateXMLFile(company:string, instance:string) {
    return this.mHttpClient.get(environment.backendXmlUrl + 'xmlAll/' + company);
  }
  
  GenerateJSONFile(company:string, instance:string) {
    return this.mHttpClient.get(environment.backendJsonUrl + company);
  }
  
  DownloadXMLFile(company:string, instance:string) {
    return this.mHttpClient.get(environment.testUrl + 'file_example_XML_24kb.xml', {responseType:'blob'});
    // return this.mHttpClient.get(environment.backendXmlUrl + 'downloadXmlAll/' + company, {responseType:'blob'});
  }
  
  DownloadJSONFile(company:string, instance:string) {
    return this.mHttpClient.get(environment.testUrl + 'file_example_JSON_1kb.json', {responseType:'blob'});
    // return this.mHttpClient.get(environment.backendJsonUrl + 'download/' + company, {responseType:'blob'});
  }

}