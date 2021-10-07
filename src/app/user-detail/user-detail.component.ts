import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { User } from '../User';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  isAdmin: boolean = false;
  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    userName: new FormControl(''),
    password: new FormControl(''),
    isAdmin: new FormControl(false),
  });
  usersInfo: User[] = JSON.parse(localStorage.getItem("loggedUser") as string);
  constructor(public dialogRef: MatDialogRef<UserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User, private api: ApiService) {
    this.form.controls['id'].setValue(data.id);
    this.form.controls['name'].setValue(data.name);
    this.form.controls['userName'].setValue(data.userName);
    this.form.controls['password'].setValue(data.password);
    this.form.controls['isAdmin'].setValue(data.isAdmin);

    if (this.usersInfo.find(f => f.isAdmin)) {
      this.isAdmin = true;
    }
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.valid) {
      if (this.form.value.id > 0) {
        this.api.updateUser(this.form.value).subscribe(d => {
          this.dialogRef.close();
        })
      } else {
        this.api.createUser(this.form.value).subscribe(d => {
          this.dialogRef.close();
        })
      }
    }
  }
}
