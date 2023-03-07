import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PizzabotPage } from './pizzabot.page';

describe('Tab1Page', () => {
  let component: PizzabotPage;
  let fixture: ComponentFixture<PizzabotPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PizzabotPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PizzabotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
