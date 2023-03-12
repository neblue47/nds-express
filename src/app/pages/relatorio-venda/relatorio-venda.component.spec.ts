import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioVendaComponent } from './relatorio-venda.component';

describe('RelatorioVendaComponent', () => {
  let component: RelatorioVendaComponent;
  let fixture: ComponentFixture<RelatorioVendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioVendaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
