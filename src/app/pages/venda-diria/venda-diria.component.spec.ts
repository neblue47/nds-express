import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendaDiriaComponent } from './venda-diria.component';

describe('VendaDiriaComponent', () => {
  let component: VendaDiriaComponent;
  let fixture: ComponentFixture<VendaDiriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendaDiriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendaDiriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
