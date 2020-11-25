import { FormConversor, submitPayload } from './services/form/form-conversor.service';
import { FormResult } from './services/form/form-result.service';
import './style.scss';
window.onload = ()=>{
  const formConversor = new FormConversor('.form-conversor-binary');
  const formResult = new FormResult('.form-converter-results', '.box-converter-result');
  formConversor.onSubmit((payload:submitPayload)=>{
    formResult.addResult(payload);
  })

  formResult.onChange((qntResults:number)=>{
    document.querySelector('.container').setAttribute('qnt-results', String(qntResults));
  })
}
