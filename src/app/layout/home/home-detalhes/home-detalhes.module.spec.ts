import { HomeDetalhesModule } from './home-detalhes.module';

describe('HomeDetalhesModule', () => {
  let homeDetalhesModule: HomeDetalhesModule;

  beforeEach(() => {
    homeDetalhesModule = new HomeDetalhesModule();
  });

  it('should create an instance', () => {
    expect(homeDetalhesModule).toBeTruthy();
  });
});
