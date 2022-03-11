import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedInfoComponent } from './booked-info.component';

describe('BookedInfoComponent', () => {
  let component: BookedInfoComponent;
  let fixture: ComponentFixture<BookedInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookedInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
