import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { User } from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: string = "";

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.valid) {
      this.api.getLoginUser(this.form.value.username, this.form.value.password).subscribe((users: any) => {
        localStorage.setItem("loggedUser", JSON.stringify(users));
        if (users.length > 0) {
          this.router.navigate(['Users']);
        }
      })
    }
  }
}
