import { TestBed } from '@angular/core/testing';
import { LoadingModule } from '../shared/loading/loading.module';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        LoadingModule
      ],
      providers: [LoadingService]
    });
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
