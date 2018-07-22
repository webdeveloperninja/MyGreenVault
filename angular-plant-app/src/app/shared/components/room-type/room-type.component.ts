import { Component, Input } from '@angular/core';
import { RoomType } from '../../models/room-type';

@Component({
  selector: 'room-type',
  templateUrl: './room-type.component.html',
  styleUrls: ['./room-type.component.scss']
})
export class RoomTypeComponent {
  @Input() type: RoomType;
}
