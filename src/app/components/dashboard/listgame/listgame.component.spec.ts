import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListgameComponent } from './listgame.component';

describe('ListgameComponent', () => {
  let component: ListgameComponent;
  let fixture: ComponentFixture<ListgameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListgameComponent]
    });
    fixture = TestBed.createComponent(ListgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
