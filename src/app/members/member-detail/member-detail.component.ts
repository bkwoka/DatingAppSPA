import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../_models/user";
import {AlertifyService} from "../../_services/alertify.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../_services/user.service";
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from "ngx-gallery";
import {TabsetComponent} from "ngx-bootstrap";

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs', {static: true}) memberTabs: TabsetComponent

  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private userService: UserService,
              private alertif: AlertifyService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => this.user = data['user']);

    this.route.queryParams.subscribe(params => {
      const selectedTab = params['tab'];
      this.memberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];

    this.galleryImages = this.getImages();
  }

  getImages() {
    const imageUrls = [];
    for (const photo of this.user.photos) {
      imageUrls.push(
        {
          small: photo.url,
          medium: photo.url,
          big: photo.url,
          description: photo.description
        });
    }
    return imageUrls;
  }

  selectTab(tabId: number){
    this.memberTabs.tabs[tabId].active = true;
  }
}
