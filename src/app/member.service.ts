import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs'
import { member } from "./member.model"; 
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class MemberService{
  private members: member[] = [];
  constructor(private http: HttpClient, private router: Router) { }

  getMember(id:string){
    return this.http.get<{
      _id: string;
      username: string;
      password: string;
      email: string;
      fullname: string;
      height: string;
      weight: string;
    }>("http://localhost:3000/api/profile/"+ id);
  };

}