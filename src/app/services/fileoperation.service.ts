import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FileDownload } from '../models/file-download.model';


@Injectable({
  providedIn: 'root'
})
export class FileoperationService {

  constructor(private mHttpClient: HttpClient) { }

  GenerateXMLFile(company: string, instance: string) {
    return this.mHttpClient.get(environment.backendXmlUrl + 'xmlAll/' + company);
  }

  GenerateJSONFile(company: string, instance: string) {
    return this.mHttpClient.get(environment.backendJsonUrl + company);
  }

  DownloadXMLFile(company: string, instance: string): Observable<FileDownload> {
    return this.mHttpClient.get(`${environment.backendXmlUrl}downloadXmlAll/${company}/${instance}`, {
      responseType: 'blob',
      observe: 'response'
    }).pipe(
      map((response: HttpResponse<Blob>) => {
        return new FileDownload(this.getFileName(response), response.body);
      })
    );
  }


  DownloadJSONFile(company: string, instance: string): Observable<FileDownload> {
    return this.mHttpClient.get(`${environment.backendJsonUrl}download/${company}/${instance}`, {
      responseType: 'blob',
      observe: 'response'
    }).pipe(
      map((response: HttpResponse<Blob>) => {
        return new FileDownload(this.getFileName(response), response.body);
      })
    );
  }

  getFileName(response: HttpResponse<Blob>) {
    var contentDisposition = response.headers.get('content-disposition')
    var filename = contentDisposition.split('=')[1].trim();
    console.log(filename);
    return filename;
  }

}