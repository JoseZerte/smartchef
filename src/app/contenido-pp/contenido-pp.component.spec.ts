import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContenidoPPComponent } from './contenido-pp.component';

describe('ContenidoPPComponent', () => {
  let component: ContenidoPPComponent;
  let fixture: ComponentFixture<ContenidoPPComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ContenidoPPComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContenidoPPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
