import { HomeDetalhesv1Module } from './home-detalhes.module';

describe('HomeDetalhesv1Module', () => {
  let homeDetalhesv1Module: HomeDetalhesv1Module;

  beforeEach(() => {
    homeDetalhesv1Module = new HomeDetalhesv1Module();
  });

  it('should create an instance', () => {
    expect(homeDetalhesv1Module).toBeTruthy();
  });
});
