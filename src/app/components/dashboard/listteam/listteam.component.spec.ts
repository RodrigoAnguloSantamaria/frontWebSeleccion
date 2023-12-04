import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListteamComponent } from './listteam.component';

describe('ListteamComponent', () => {
  let component: ListteamComponent;
  let fixture: ComponentFixture<ListteamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListteamComponent]
    });
    fixture = TestBed.createComponent(ListteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
