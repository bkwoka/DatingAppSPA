import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {User} from "../_models/user";
import {UserService} from "../_services/user.service";
import {AlertifyService} from "../_services/alertify.service";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {AuthService} from "../_services/auth.service";

@Injectable()
export class ListsResolver  implements Resolve<User[]>{

  likesParam = 'Likers';

  constructor(private userService: UserService,
              private router: Router,
              private alertify: AlertifyService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]>{
    return this.userService.getUsers(null, null, null, this.likesParam).pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving data');
        this.router.navigate(['/home']);
        return of(null);
      })
    )
  }
}
