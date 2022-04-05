import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import {MemberService} from "../member.service"
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  trainers:any = [];
  userIsAuthenticated = false;
  private authListenerSubs: Subscription = new Subscription;
  constructor(private authService: AuthService,private memberService: MemberService,private router: Router) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
      this.readListTrainers();
    }

    readListTrainers(){
      this.memberService.getAllTrainers().subscribe((data) => {
       this.trainers = data;
       console.log("trainers",this.trainers)
      })    
    }

    send(id : string) {
      //console.log(email)
        this.router.navigate(['trainerview', id]);
      }

}