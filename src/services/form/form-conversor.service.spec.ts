import { Converter } from "../converter/converter.service";
import { FormConversor } from "./form-conversor.service";

describe('Class FormConversor', () => {
  let service:FormConversor;
  let spyQuerySelector:jest.SpyInstance;
  const eventDom:any = {
    stopPropagation: ()=>{},
    preventDefault: ()=>{},
    target:{
      blur: ()=>{}
    }
  }
  const domSpy:any = {
    reset: ()=>{},
    setAttribute: ()=>{},
    addEventListener: ()=>{},
    querySelector:(s:string)=>({
      addEventListener:domSpy.addEventListener,
    }),
  }
  const querySelectorFncMock = jest.fn().mockImplementation(()=>domSpy);
  beforeEach(() => {
    spyQuerySelector = jest.spyOn(document, 'querySelector')
      .mockImplementation(querySelectorFncMock);
    service = new FormConversor('.form');
    service['observers'] = [];
    jest.spyOn(service, 'form', 'get').mockReturnValue(domSpy);
  });

  test('constructor should setup instance FormConversor', () => {
    const spyFnc = jest.spyOn(FormConversor.prototype, 'addEventsListeners')
      .mockImplementationOnce(jest.fn());
    const instance = new FormConversor('.form');

    expect(instance.formSelector).toBe('.form')
    expect(instance['converter']).toBeInstanceOf(Converter)
    expect(spyFnc).toHaveBeenCalled();
  });

  test('addEventsListeners have called events handle validation and submit data', ()=>{
    const spyFnc = jest.spyOn(domSpy, 'addEventListener');

    service.addEventsListeners();
    expect(spyFnc).toHaveBeenCalledWith('click', expect.any(Function))
    expect(spyFnc).toHaveBeenCalledWith('keyup', expect.any(Function))
  });

  test('onHandleSubmit when invalid binary value not dispatch submit action and reset form state', ()=>{
    const spySubmit = jest.spyOn(service, 'submit')
    const spyFormReset = jest.spyOn(service['form'], 'reset');
    const spyBlur = jest.spyOn(eventDom.target, 'blur')

    service['currentBinary'] = '100A';
    service.onHandleSubmit(eventDom);
    expect(spySubmit).not.toHaveBeenCalled();
    expect(spyFormReset).not.toHaveBeenCalled();
    expect(spyBlur).not.toHaveBeenCalled();
  });

  test('onHandleSubmit when valid binary value dispatch submit action and reset form state', ()=>{
    const spySubmit = jest.spyOn(service, 'submit');
    const spyFormReset = jest.spyOn(service['form'], 'reset')
    const spyBlur = jest.spyOn(eventDom.target, 'blur');

    service['currentBinary'] = '1111';
    service.onHandleSubmit(eventDom);
    expect(spySubmit).toHaveBeenCalledWith({binary: '1111', decimal: 15});
    expect(spyFormReset).toHaveBeenCalled();
    expect(spyBlur).toHaveBeenCalled();
  });

  test('onHandleFieldValueChange should set attribute valid with false when invalid binary value', ()=>{
    const spyFormReset = jest.spyOn(service['form'], 'setAttribute');
    
    eventDom.target.value = '10101 bC';
    service.onHandleFieldValueChange(eventDom);
    expect(spyFormReset).toHaveBeenCalledWith('valid', 'false')
  });

  test('onHandleFieldValueChange should set attribute valid with true when valid or void binary value', ()=>{
    const spyFormReset = jest.spyOn(service['form'], 'setAttribute');
    
    eventDom.target.value = '';
    service.onHandleFieldValueChange(eventDom);
    expect(spyFormReset).toHaveBeenCalledWith('valid', 'true')

    eventDom.target.value = '1001';
    service.onHandleFieldValueChange(eventDom);
    expect(spyFormReset).toHaveBeenCalledWith('valid', 'true')
  });

  test('submit have called all observers', ()=>{
    const objSpy = {
      observer:()=>{}
    }
    const spyObs = jest.spyOn(objSpy, 'observer').mockImplementationOnce(jest.fn());

    service['observers'] = [objSpy.observer, objSpy.observer];
    service.submit({binary: '1111', decimal: 15});
    expect(spyObs).toHaveBeenCalledTimes(2);
  });

  test('onSubmit should add new observer to list observers', ()=>{
    const observer = ()=>{};
    service.onSubmit(observer);
    expect(service['observers']).toEqual([observer])
  });
})