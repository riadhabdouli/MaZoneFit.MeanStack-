import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthData } from "./auth-data.model";
import { RegData } from "./reg-data.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root"})
export class AuthService {
  private isAuthenticated = false;
  private token: any;
  private tokenTimer : any;
  public userEmail : any;
  public userId : any;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router){}

  getToken(){
    return this.token;
  }

  getIsAuth(){
    
    return this.isAuthenticated;
  }


  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }


    createUser(first_name:string, last_name:string, email : string, password: string ){
      const regData: RegData = {
         first_name:first_name,
         last_name:last_name, 
         email: email, 
         password : password};
      this.http.post("http://localhost:3000/auth/register", regData).subscribe(()=>{
        this.router.navigate(['/login'])
      }, error => {
        this.authStatusListener.next(false);
      });
    }

  getMember(userEmail: string){
    return this.http.get<{
      _id: string;
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      height: string;
      weight: string; 
    }>("http://localhost:3000/auth/profile/"+userEmail);
  };

    login(email: string ,password: string ) {
      this.userEmail = email;
      const authData: AuthData = {email: email, password : password};
      this.http.post<{message:string, data:string, expiresIn: number,token:string}>("http://localhost:3000/auth/login",authData)
      .subscribe(response => {
       const token = response.token;
        this.token = token ;
        if(token){
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.data;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime()+ expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(token,expirationDate, this.userId);  
          this.router.navigate(['/']);
        }
      }, error => {
        console.log(error.error.message);
      });
    }

  getUserId() {
    console.log(this.userEmail);
    return this.userEmail;
  }

    autoAuthUser(){
    const authInformation :any = this.getAuthData();
    if(!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime() ;
    if (expiresIn > 0){
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId= authInformation.userId ;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
    }

    logout(){
      this.token = null;
      this.isAuthenticated = false;
      this.authStatusListener.next(false);
      clearTimeout(this.tokenTimer);
      this.clearAuthData();
      this.userId = null;
      this.router.navigate(['/login']);
    }
    private setAuthTimer(duration : number){
      console.log("Setting timer : "+ duration);
      this.tokenTimer =  setTimeout(()=> {
        this.logout();
      },duration * 1000);
    }
    private saveAuthData(token : string , expirationDate: Date, userId: string){
      localStorage.setItem("token",token);
      localStorage.setItem("expiration", expirationDate.toISOString());
      localStorage.setItem("userId", userId);
    }

    private clearAuthData(){
      localStorage.removeItem("token");
      localStorage.removeItem("expiration");
      localStorage.removeItem("userId");
    }
    private getAuthData(){
        const token = localStorage.getItem("token");
        const expirationDate= localStorage.getItem("expiration");
        const userId =localStorage.getItem("userId");
        if(!token || !expirationDate){
          return;
        }
        return {
          token : token,
          expirationDate: new Date(expirationDate),
          userId: userId
        }
    }
   
}