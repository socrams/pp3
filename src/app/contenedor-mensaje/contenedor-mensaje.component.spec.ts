import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorMensajeComponent } from './contenedor-mensaje.component';

describe('ContenedorMensajeComponent', () => {
  let component: ContenedorMensajeComponent;
  let fixture: ComponentFixture<ContenedorMensajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorMensajeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenedorMensajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
