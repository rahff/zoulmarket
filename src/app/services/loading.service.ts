import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$: Observable<boolean> = this.loadingSubject.asObservable()

  constructor() { }

  loadingOn(): void {
    this.loadingSubject.next(true)
  }
  loadingOff(): void {
    this.loadingSubject.next(false)
  }
}
