import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomBookModalComponent } from './room-book-modal.component';

describe('RoomBookModalComponent', () => {
  let component: RoomBookModalComponent;
  let fixture: ComponentFixture<RoomBookModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomBookModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomBookModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
