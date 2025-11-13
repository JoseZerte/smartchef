import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SavesComponent } from './saves.component';

describe('SavesComponent', () => {
  let component: SavesComponent;
  let fixture: ComponentFixture<SavesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SavesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
