import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { validateEmail, emailMask } from 'app/shared/utilities';

@Component({
  selector: 'vault-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent {
  email: string;
  emailList: string[] = [];
  emailMask = emailMask;

  @Output() emails = new EventEmitter<string[]>();

  @Input() title: string;

  removeEmail(index: number): void {
    this.emailList.splice(index, 1);
    this.emails.next(this.emailList);
  }

  addEmail(): void {
    if (!validateEmail(this.email)) {
      return;
    }

    this.emailList.push(this.email);
    this.email = null;
    this.emails.next(this.emailList);
  }

  addEmailIfValid(): void {
    if (validateEmail(this.email)) {
      this.addEmail();
      return;
    }

    this.email = null;
  }
}
