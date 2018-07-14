import { Component, OnInit, Input } from '@angular/core';
import { PlantsService } from '../../services/plants';

@Component({
  selector: 'vault-delete-image',
  templateUrl: './delete-image.component.html',
  styleUrls: ['./delete-image.component.scss']
})
export class DeleteImageComponent implements OnInit {
  @Input() plantId: string;
  constructor(private readonly _plantService: PlantsService) {}

  delete() {
    this._plantService.deleteProfileImage(this.plantId).subscribe();
  }

  ngOnInit() {}
}
