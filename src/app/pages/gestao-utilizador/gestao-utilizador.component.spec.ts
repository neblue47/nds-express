import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoUtilizadorComponent } from './gestao-utilizador.component';

describe('GestaoUtilizadorComponent', () => {
  let component: GestaoUtilizadorComponent;
  let fixture: ComponentFixture<GestaoUtilizadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestaoUtilizadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestaoUtilizadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
