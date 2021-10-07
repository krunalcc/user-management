import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { User } from '../User';
import { UserDetailComponent } from '../user-detail/user-detail.component';

@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.css']
})
export class UserGridComponent implements OnInit {
  isAdmin: boolean = false;
  displayedColumns = ['name', 'username', 'action'];
  dataSource = [];
  newUser = new User();
  usersInfo: User[] = JSON.parse(localStorage.getItem("loggedUser") as string);
  constructor(public dialog: MatDialog, private api: ApiService, public router: Router) {
    if (this.usersInfo.find(f => f.isAdmin)) {
      this.isAdmin = true;
    }
  }

  ngOnInit(): void {
    this.getUsers();
  }
  delete(data: any) {
    this.api.deleteUser(data.id).subscribe(d => {
      this.getUsers();
    })
  }
  openDialog(element: any): void {
    let dialogRef = this.dialog.open(UserDetailComponent, {
      width: '690px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }
  getUsers() {
    if (this.isAdmin) {
      this.api.getusers().subscribe((d: any) => {
        this.dataSource = d;
      })
    } else {
      this.api.getUser(this.usersInfo[0].id).subscribe((d: any) => {
        this.dataSource = d;
      })
    }
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['Login']);
  }
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
