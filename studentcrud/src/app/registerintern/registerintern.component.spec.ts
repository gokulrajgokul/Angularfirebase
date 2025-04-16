import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterinternComponent } from './registerintern.component';

describe('RegisterinternComponent', () => {
  let component: RegisterinternComponent;
  let fixture: ComponentFixture<RegisterinternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterinternComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterinternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
