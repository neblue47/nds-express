import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksEntradaComponent } from './stocks-entrada.component';

describe('StocksEntradaComponent', () => {
  let component: StocksEntradaComponent;
  let fixture: ComponentFixture<StocksEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StocksEntradaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StocksEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
