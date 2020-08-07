import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root",
})
export class ServerService {
  header = new HttpHeaders();

  //  hostAddress="http://sajusaju-001-site1.atempurl.com/"
  hostAddress = "http://sajumindsoft-001-site1.btempurl.com/";
  constructor(private http: HttpClient, public router: Router) {
    this.header = this.header.set("Content-Type", "application/json");
  }
  // private REST_API_SERVER = 'https://reqres.in/api/users?page=2';

  public getData(url) {
    return this.http.get(this.hostAddress + url);
  }

  public postData(url, data) {
    return this.http.post(this.hostAddress + url, data);
  }
}
