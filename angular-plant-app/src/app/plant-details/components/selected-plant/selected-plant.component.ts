import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vault-selected-plant',
  templateUrl: './selected-plant.component.html',
  styleUrls: ['./selected-plant.component.scss']
})
export class SelectedPlantComponent implements OnInit {
  @Input() selectedWeek;
  constructor() { }

  ngOnInit() {
  }

}
