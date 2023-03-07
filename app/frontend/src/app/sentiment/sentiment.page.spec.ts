import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';


import { SentimentPage } from './sentiment.page';

describe('SentimentPage', () => {
  let component: SentimentPage;
  let fixture: ComponentFixture<SentimentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SentimentPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SentimentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
