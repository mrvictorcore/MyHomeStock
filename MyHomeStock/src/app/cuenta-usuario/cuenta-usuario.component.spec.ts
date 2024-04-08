import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaUsuarioComponent } from './cuenta-usuario.component';

describe('CuentaUsuarioComponent', () => {
  let component: CuentaUsuarioComponent;
  let fixture: ComponentFixture<CuentaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuentaUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuentaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
