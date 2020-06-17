import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardSuperAdminComponent } from './board-super-admin.component';

describe('BoardSuperAdminComponent', () => {
  let component: BoardSuperAdminComponent;
  let fixture: ComponentFixture<BoardSuperAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardSuperAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardSuperAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
