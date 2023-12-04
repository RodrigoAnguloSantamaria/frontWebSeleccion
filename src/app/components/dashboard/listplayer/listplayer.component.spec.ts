import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListplayerComponent } from './listplayer.component';

describe('ListplayerComponent', () => {
  let component: ListplayerComponent;
  let fixture: ComponentFixture<ListplayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListplayerComponent]
    });
    fixture = TestBed.createComponent(ListplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
