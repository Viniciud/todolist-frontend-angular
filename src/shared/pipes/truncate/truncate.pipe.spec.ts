import { TruncatePipe } from './truncate.pipe';

describe('Pipe: Truncatee', () => {
  it('create an instance', () => {
    let pipe = new TruncatePipe();
    expect(pipe).toBeTruthy();
  });

  it('transformComTamanhoInferiorAoMaximoPermitido', () => {
    const pipe = new TruncatePipe();
    let valor = pipe.transform('Teste quando o tamanho máximo não é ultrapassado', 50);
    expect(valor).toEqual('Teste quando o tamanho máximo não é ultrapassado');
  })

  it('transformComTamanhoSuperiorAoMaximoPermitido', () => {
    const pipe = new TruncatePipe();
    let valor = pipe.transform('Teste quando o tamanho máximo é ultrapassado', 40);
    expect(valor).toEqual('Teste quando o tamanho máximo é ultrapas...');
  })

});
