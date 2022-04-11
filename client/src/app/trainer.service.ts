import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject, Subscriber, Subscription } from 'rxjs'
import { memberData } from "./member.model";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthService } from "./auth/auth.service";
import { HeadService } from "./header/head.service";


@Injectable({ providedIn: 'root' })
export class TrainerService {
    private trainers: memberData[] = [];
    trainer: any;
    imageD: string = "";
    constructor(
      private http: HttpClient,
      private router: Router,
      private headService: HeadService) { }


    getTrainer(userId: string){
      return this.http.get<{
          _id: string;
          first_name: string;
          last_name: string;
          email: string;
          password: string;
          profile_image: string;
          profession: string;
          members: Array<string>;
      }>("http://localhost:3000/trainer/profile/" + userId);
    };  

};










