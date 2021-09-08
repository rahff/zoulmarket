import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/shared/models/store';


@Injectable()
export class HomeStoresResolver implements Resolve<Store[]> {
  constructor(private storeService: StoreService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Store[]> {
    return this.storeService.getStoresPromo().pipe(first());
  }
}