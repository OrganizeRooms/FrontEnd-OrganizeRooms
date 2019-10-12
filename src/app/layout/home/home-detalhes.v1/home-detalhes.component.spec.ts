import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDetalhesv1Component } from './home-detalhes.component';

describe('HomeDetalhesv1Component', () => {
  let component: HomeDetalhesv1Component;
  let fixture: ComponentFixture<HomeDetalhesv1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeDetalhesv1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDetalhesv1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
