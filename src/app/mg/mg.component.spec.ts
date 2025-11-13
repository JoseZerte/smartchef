import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MgComponent } from './mg.component';

describe('MgComponent', () => {
  let component: MgComponent;
  let fixture: ComponentFixture<MgComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MgComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
