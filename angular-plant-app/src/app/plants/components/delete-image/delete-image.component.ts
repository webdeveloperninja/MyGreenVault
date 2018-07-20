import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PlantsService } from '../../services/plants';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'vault-delete-image',
  templateUrl: './delete-image.component.html',
  styleUrls: ['./delete-image.component.scss']
})
export class DeleteImageComponent implements OnInit {
  @Input() plantId: string;
  @Output() imageDeleted = new EventEmitter();
  constructor(private readonly _plantService: PlantsService) {}

  delete() {
    this._plantService
      .deleteProfileImage(this.plantId)
      .pipe(
        finalize(() => {
          console.log('delete');
          this.imageDeleted.next();
        })
      )
      .subscribe();
  }

  ngOnInit() {}
}
