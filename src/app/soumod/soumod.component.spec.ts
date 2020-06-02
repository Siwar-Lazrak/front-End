import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoumodComponent } from './soumod.component';

describe('SoumodComponent', () => {
  let component: SoumodComponent;
  let fixture: ComponentFixture<SoumodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoumodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoumodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
