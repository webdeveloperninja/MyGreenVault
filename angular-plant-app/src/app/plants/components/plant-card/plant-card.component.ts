import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'plant-card',
  templateUrl: './plant-card.component.html',
  styleUrls: ['./plant-card.component.scss']
})
export class PlantCardComponent implements OnInit {
  @Input() plant: any;
  @Input() status: string;

  constructor() {}

  ngOnInit() {}
}
