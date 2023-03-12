import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoProdutoComponent } from './gestao-produto.component';

describe('GestaoProdutoComponent', () => {
  let component: GestaoProdutoComponent;
  let fixture: ComponentFixture<GestaoProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestaoProdutoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestaoProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
