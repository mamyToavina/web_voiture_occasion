import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;
  constructor(private fb: FormBuilder,private loginService : LoginService, private router : Router) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username : this.fb.control("admin"),
      password : this.fb.control("admin")
    })
  }

  submit_login(){
    let username = this.formLogin.value.username;
    let password = this.formLogin.value.password;
    console.log('Attempting login for username:', username);
    this.loginService.login(username,password).subscribe({
      next : data => {
        console.log('Login success:', data);
        console.log('id_user', this.loginService.id);
        this.loginService.load_profile(data);
        this.router.navigateByUrl("/admin");
      },
      error : err => {
        console.error('Login error:', err);
      }
    })
  }

}
