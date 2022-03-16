import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service" ;
import { HeadService } from "./head.service";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription = new Subscription;
  
  constructor(private authService: AuthService, private headService : HeadService) { }
  public email : string = "";

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
     } 
  
     onClickProfile(){
       this.email = this.authService.getUserId();
       this.headService.updatePro(this.email);
      // console.log(this.email);
     }

   /*onUpdate(email : string){  // this methode is for making the fetching available after profile updating
       this.email = email; 
       console.log(this.email);
   } */
  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}