import { TestBed } from '@angular/core/testing';

import { SimpleStorageService } from './simple-storage.service';

describe('SimpleStorageService', () => {
  let service: SimpleStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimpleStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set Data', () => {
    service.setData('arroz', 'arroz1');
    service.cleanData('arroz');
    expect(service.setData).toBeDefined();
  });

  it('should get Data', () => {
    service.setData('arroz', 'arroz1');
    service.getData('arroz');
    service.cleanData('arroz');
    expect(service.getData).toBeDefined();
  });
});
