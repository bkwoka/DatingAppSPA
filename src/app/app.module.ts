import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {JwtModule} from "@auth0/angular-jwt";
import {TimeAgoPipe} from 'time-ago-pipe';

import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {ErrorInterceptorProvider} from "./_services/error.interceptor";
import {BsDatepickerModule, BsDropdownModule, ButtonsModule, PaginationModule, TabsModule} from "ngx-bootstrap";
import {ListsComponent} from './lists/lists.component';
import {MessagesComponent} from './messages/messages.component';
import {appRoutes} from "./routes";
import {MemberListComponent} from "./members/member-list/member-list.component";
import {MemberCardComponent} from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import {AlertifyService} from "./_services/alertify.service";
import {NgxGalleryModule} from "ngx-gallery";
import { MemberEditComponent } from './members/members-edit/member-edit.component';
import {MemberDetailResolver} from "./_resolvers/member-detail.resolver";
import {MemberEditResolver} from "./_resolvers/member-edit.resolver";
import {AuthService} from "./_services/auth.service";
import {AuthGuard} from "./_guards/auth.guard";
import {UserService} from "./_services/user.service";
import {PreventUnsavedChangesGuard} from "./_guards/prevent-unsaved-changes.guard";
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import {FileUploadModule} from "ng2-file-upload";
import {MemberListResolver} from "./_resolvers/member-list.resolver";
import {ListsResolver} from "./_resolvers/lists.resolver";
import {MessagesResolver} from "./_resolvers/messages.resolver";
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';


export function tokenGetter() {
  return localStorage.getItem('token');
}

export class CustomHammerConfig extends HammerGestureConfig  {
  overrides = {
    pinch: { enable: false },
    rotate: { enable: false }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    ListsComponent,
    MemberListComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    TimeAgoPipe,
    MemberMessagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    NgxGalleryModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth']
      }
    }),
    FileUploadModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    ErrorInterceptorProvider,
    AlertifyService,
    UserService,
    MemberDetailResolver,
    MemberEditResolver,
    MemberListResolver,
    PreventUnsavedChangesGuard,
    ListsResolver,
    MessagesResolver,
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

