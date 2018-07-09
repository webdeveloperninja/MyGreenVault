import { Pipe, PipeTransform } from '@angular/core';
import { TokenService } from 'app/shared/services/token/token.service';

@Pipe({
  name: 'plantProfile'
})
export class PlantProfilePipe implements PipeTransform {
  placeHolder = 'assets/images/placeholder.jpg';

  constructor(private readonly _tokenService: TokenService) {}

  transform(plantId: string): any {
    const userId = this._tokenService.getToken('userId');

    return `https://mygreenvault.blob.core.windows.net/plant-profile-photo/${userId}:${plantId}:profile`;
  }
}
