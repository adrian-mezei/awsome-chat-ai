import { TestBed } from '@angular/core/testing';

import { PizzabotService } from './pizzabot.service';

describe('PizzabotService', () => {
  let service: PizzabotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PizzabotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
