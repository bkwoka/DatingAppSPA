import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../_models/message";
import {UserService} from "../../_services/user.service";
import {AuthService} from "../../_services/auth.service";
import {AlertifyService} from "../../_services/alertify.service";
import {cloneWithOffset} from "ngx-bootstrap/chronos/units/offset";
import {tap} from "rxjs/operators";
import {extractMessages} from "@angular/compiler/src/i18n/extractor_merger";

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(private userService: UserService, private authService: AuthService, private alertify: AlertifyService) {
  }

  ngOnInit() {
    this.loadMessages()
  }

  loadMessages() {
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
      .pipe(
        tap((messages: Message[]) => {
          for (let i = 0; i < messages.length; i++) {
            if (messages[i].isRead === false && messages[i].recipientId === currentUserId) {
              this.userService.markAsRead(currentUserId, messages[i].id)
            }
          }
        })
      )
      .subscribe((messages: Message[]) => {
        this.messages = messages;
      }, error => {
        this.alertify.error(error)
      })
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage).subscribe((message: Message) => {
      this.messages.unshift(message);
      this.newMessage.content = '';
      //this.loadMessages()
    }, error => {
      this.alertify.error(error);
    })
  }
}
