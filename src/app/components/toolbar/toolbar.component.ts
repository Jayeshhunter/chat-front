import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import * as M from 'materialize-css';
import { UsersService } from 'src/app/services/users.service';
import * as moment from 'moment';
import io from 'socket.io-client';
import _ from 'lodash';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  user: any;
  userData = [];
  socket: any;
  notifications = [];
  count = [];
  constructor(private tokenService: TokenService, private router: Router, private usersService: UsersService) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit(): void {
    this.user = this.tokenService.GetPayload();
    const dropDownElement = document.querySelector('.dropdown-trigger');
    M.Dropdown.init(dropDownElement, {
      alignment: 'right',
      hover: true,
      coverTrigger: false,
    });
    this.GetUser();
    this.socket.on('refreshPage', () => {
      this.GetUser();
    });
  }

  GetUser() {
    this.usersService.GetUserById(this.user._id).subscribe(
      (data) => {
        this.notifications = data.result.notifications.reverse();
        const value = _.filter(this.notifications, ['read', false]);
        this.count = value;
      },
      (err) => {
        if (err.error.token === null) {
          this.tokenService.DeleteToken();
          this.router.navigate(['']);
        }
      }
    );
  }

  MarkAll() {
    this.usersService.MarkAllAsRead().subscribe((data) => {
      console.log(data);
      this.socket.emit('refresh', {});
    });
  }

  logout() {
    this.tokenService.DeleteToken();
    this.router.navigate(['']);
  }

  GoToHome() {
    this.router.navigate(['streams']);
  }

  TimeFromNow(time) {
    return moment(time).fromNow();
  }
}
