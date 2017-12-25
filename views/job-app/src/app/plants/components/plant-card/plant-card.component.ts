import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../../services/plants';

@Component({
  selector: 'plant-card',
  templateUrl: './plant-card.component.html',
  styleUrls: ['./plant-card.component.scss']
})
export class PlantCardComponent implements OnInit {
  @Input() job: Job;
  @Input() status: string; 

  constructor() { }

  ngOnInit() {
  }

}
