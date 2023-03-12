import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioProdutoComponent } from './relatorio-produto.component';

describe('RelatorioProdutoComponent', () => {
  let component: RelatorioProdutoComponent;
  let fixture: ComponentFixture<RelatorioProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioProdutoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
