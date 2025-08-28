import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PptGeneratorComponent } from './ppt-generator.component';

describe('PptGeneratorComponent', () => {
  let component: PptGeneratorComponent;
  let fixture: ComponentFixture<PptGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PptGeneratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PptGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
