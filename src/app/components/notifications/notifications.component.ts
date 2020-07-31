import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import io from 'socket.io-client';
import * as moment from 'moment';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  socket: any;
  user: any;
  notifications = [];
  constructor(private tokenService: TokenService, private usersService: UsersService) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit(): void {
    this.user = this.tokenService.GetPayload();
    console.log(this.user);
    this.GetUser();
    this.socket.on('refreshPage', () => {
      this.GetUser();
    });
  }
  GetUser() {
    this.usersService.GetUserById(this.user._id).subscribe((data) => {
      this.notifications = data.result.notification.reverse();
    });
    // this.usersService.GetUserByName(this.user.username).subscribe((data) => {
    //   console.log(data);
    // });
  }
  MarkNotification(data) {
    this.usersService.MarkNotification(data._id).subscribe((value) => {
      this.socket.emit('refresh', {});
    });
  }

  DeleteNotification(data) {
    this.usersService.MarkNotification(data._id, true).subscribe((value) => {
      this.socket.emit('refresh', {});
    });
  }

  TimeFromNow(time) {
    return moment(time).fromNow();
  }
}
