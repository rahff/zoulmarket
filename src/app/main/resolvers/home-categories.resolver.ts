import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../shared/models/category.model';

@Injectable()
export class HomeCategoriesResolver implements Resolve<Category[]> {
  constructor(private categoryService: CategoryService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Category[]> {
    return this.categoryService.getSuggestionCategory().pipe(first());
  }
}
