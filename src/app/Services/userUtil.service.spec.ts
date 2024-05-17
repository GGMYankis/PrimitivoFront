/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserUtilService } from './userUtil.service';

describe('Service: UserUtil', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserUtilService]
    });
  });

  it('should ...', inject([UserUtilService], (service: UserUtilService) => {
    expect(service).toBeTruthy();
  }));
});
