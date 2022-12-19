import { Component, OnInit } from '@angular/core';
import { DValidateRules, FormLayout } from 'ng-devui/form';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import {Message} from "ng-devui";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  layoutDirection: FormLayout = FormLayout.Vertical;

  msgs: Array<Message> = [];

  formData = {
    userName: '',
    password: '',
  };

  login(){
    if(this.formData.userName=="manager"&&this.formData.password=="123"){
      console.log("登录成功");
      this.router.navigate(['index'])
      return true;
    }else{
      console.log("用户名或密码错误")
      return false;
    }
  }


}
