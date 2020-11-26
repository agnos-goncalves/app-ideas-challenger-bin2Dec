import './style.scss';
import { FormConversor, submitPayload } from './services/form/form-conversor.service';
import { FormResult } from './services/form/form-result.service';

export function initializer(): void {
  const container = document.querySelector('.container');
  const formConversor = new FormConversor('.form-conversor-binary');
  const formResult = new FormResult('.form-converter-results', '.box-converter-result');

  formResult.onChange((qntResults:number) => {
    container.setAttribute('qnt-results', String(qntResults));
  });

  formConversor.onSubmit((payload:submitPayload) => {
    formResult.addResult(payload);
  });
}

window.onload = () => {
 initializer();
}
