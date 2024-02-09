import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AppConstant } from '../AppConstant';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isAuthenticated : boolean = false;
  id!: string;
  roles : any;
  username : any;
  token!: string;

  apiUrl = AppConstant.apiUrl;

  constructor(private http:HttpClient, private router : Router) { }

  public login(username : string, password : string){
    let options = {
      headers : new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    }

    let params = new HttpParams().set("username",username).set("password",password);
    return this.http.post(`${this.apiUrl}/test/login`,params,options);
    
  }

  load_profile(data: any){
    this.isAuthenticated = true;
    this.token = data['access-token'];
    let jwtDecoded:any = jwtDecode(this.token);
    this.id = data['id_user'];
    this.username = jwtDecoded.sub;
    this.roles = jwtDecoded.scope;
    window.localStorage.setItem("id_user",this.id);
    window.localStorage.setItem("jwt-token",this.token);
  }

  logout(){
    this.isAuthenticated = false;
    this.id = '';
    this.username = undefined;
    this.roles = undefined;
    this.isAuthenticated = false;
    window.localStorage.removeItem("jwt-token");
    window.localStorage.removeItem("id_user");
    this.router.navigateByUrl("/login");
  }

  loadTokenFromLocalStorage(){
    let jwt_token = window.localStorage.getItem("jwt-token")?.toString;
    if(jwt_token){
      this.load_profile({token : jwt_token});
    }
  }

}
