﻿import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {User} from "../_models/user";
import {UserService} from "../_services/user.service";
import {AlertifyService} from "../_services/alertify.service";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {Message} from "../_models/message";
import {AuthService} from "../_services/auth.service";

@Injectable()
export class MessagesResolver  implements Resolve<Message[]>{
  pageNumber = 1;
  pageSize = 50;
  messageContainer = 'Unread';


  constructor(private userService: UserService,
              private router: Router,
              private alertify: AlertifyService,
              private authService: AuthService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Message[]>{
    return this.userService.getMessages(this.authService.decodedToken.nameid ,this.pageNumber, this.pageSize, this.messageContainer).pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving messages');
        this.router.navigate(['/home']);
        return of(null);
      })
    )
  }
}
