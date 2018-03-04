import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'ti-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent implements OnInit {

  isNotificationOn: boolean = false;
  notificationText: string = '';

  constructor(
    private _notificationService: NotificationService
  ) { }

  ngOnInit() {
    this._notificationService.isNotificationOn$.subscribe(isNotificationOn => {
      this.isNotificationOn = isNotificationOn;
    });

    this._notificationService.notificationText$.subscribe(notificationText => {
      this.notificationText = notificationText;
    });
  }

  hideNotification() {
    this._notificationService.setNotificationOff();
  }

}
