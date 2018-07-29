import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate, query, group } from '@angular/animations';

@Component({
  selector: 'vault-selected-plant',
  templateUrl: './selected-plant.component.html',
  styleUrls: ['./selected-plant.component.scss']
})
export class SelectedPlantComponent implements OnInit {
  isEdit = false;
  @Input() selectedWeek;

  constructor() {}

  ngOnInit() {}

  toggleEdit() {
    if (this.isEdit) {
      this.isEdit = false;
    } else {
      this.isEdit = true;
    }
  }
}
