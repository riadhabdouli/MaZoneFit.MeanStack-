import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs'
import { memberData } from "./member.model"; 
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthService } from "./auth/auth.service";

@Injectable({ providedIn: 'root' })
export class MemberService{
  private members: memberData[] = [];
  constructor(private http: HttpClient, private router: Router) { }

 
  getMember(userId:string){
    return this.http.get<{
      _id: string;
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      height: string;
      weight: string;
    }>("http://localhost:3000/ath/profile/"+ userId);
  };
 
  updateMember(id: string, first_name:string, last_name:string, email:string,password:string,height:string,weight:string){
        let memberData: memberData;
    memberData = {
           id:id,
           first_name:first_name,
           last_name:last_name,
           email:email,
           password:password,
           weight:weight,
           height:height
         };
    this.http.put("http://localhost:3000/auth/profile/"+id,memberData)
    .subscribe(Response => {
      this.router.navigate(["/"]);
    })
  };
}