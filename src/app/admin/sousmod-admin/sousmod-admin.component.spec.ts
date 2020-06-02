import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SousmodAdminComponent } from './sousmod-admin.component';

describe('SousmodAdminComponent', () => {
  let component: SousmodAdminComponent;
  let fixture: ComponentFixture<SousmodAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SousmodAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SousmodAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
