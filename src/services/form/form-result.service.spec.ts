import { FormResult, resultItem } from "./form-result.service";

describe('Class FormResult', () => {
  let service:FormResult;
  let spyQuerySelector:jest.SpyInstance;
  const domSpy:any = {
    innerHTML: '',
    prepend: ()=>{},
    addEventListener: ()=>{},
    querySelector:(s:string)=>({
      addEventListener:domSpy.addEventListener,
    }),
  }
  const querySelectorFncMock = jest.fn().mockImplementation(()=>domSpy);

  beforeEach(() => {
    spyQuerySelector = jest.spyOn(document, 'querySelector')
    .mockImplementation(querySelectorFncMock);
    service = new FormResult('.form', '.result');
    jest.spyOn(service, 'form', 'get').mockReturnValue(domSpy);
  });

  test('constructor should setup instance FormResult and setup initial configs', () => {
    const spyFnc = jest.spyOn(domSpy, 'addEventListener')
      .mockImplementationOnce(jest.fn());
    const instance = new FormResult('.form', '.list-result');
    expect(instance.formSelector).toEqual('.form');
    expect(instance.listResultSelector).toEqual('.list-result');
    expect(spyFnc).toHaveBeenCalledWith('click', expect.any(Function));
  })
  test('getHtmlElementResultItem should computed template html li with binary and decimal values', () => {
    const item:resultItem = {
      binary: '1111',
      decimal: 15
    }
    const li = service.getHtmlElementResultItem(item);

    expect(li.className).toEqual('box-converter-result__item');
    expect(li.innerHTML).toEqual(`
      <label>Binary:</label>
      <span>${item.binary}</span>
      <label>Decimal:</label>
      <span>${item.decimal}</span>
    `);
  })
  test('addResult should append html li result with list results and have called observers', () => {
    const spyListResult = jest.spyOn(service.listResult, 'prepend');
    const spyFnc = jest.spyOn(service, 'dispatchEventToObservers').mockImplementationOnce(jest.fn());
    const item:resultItem = {
      binary: '1111',
      decimal: 15
    }
    service.addResult(item);
    expect(service.qntResultsItem).toEqual(1);
    expect(spyListResult).toHaveBeenCalled();
    expect(spyFnc).toHaveBeenCalledWith(service.qntResultsItem);
  })
  test('clearResult shoudl remove html content on result list', () => {
    service.listResult.innerHTML = '<li></li>';
    service.clearResult();
    expect(service.listResult.innerHTML).toBe('')
  })
  test('onHandleClear have called required clear behaviors', () => {
    const spyClearResult = jest.spyOn(service, 'clearResult').mockImplementationOnce(jest.fn());
    const spyObservers = jest.spyOn(service, 'dispatchEventToObservers').mockImplementationOnce(jest.fn());
    
    service.qntResultsItem = 1;
    service.onHandleClear();
    expect(service.qntResultsItem).toBe(0);
    expect(spyClearResult).toHaveBeenCalled();
    expect(spyObservers).toHaveBeenCalledWith(service.qntResultsItem);
  })
  test('onChange should add new observer on list observers', () => {
    const fnc:any = ()=>{};
    service.onChange(fnc)
    expect(service['observers']).toEqual([fnc])
  })
  test('dispatchEventToObservers have called all observers with quantity results item', () => {
    const objSpy = {
      fnc: ()=>{}
    };
    const spyFnc = jest.spyOn(objSpy, 'fnc');
    service['observers'] = [objSpy.fnc];
    service.qntResultsItem = 2;
    service.dispatchEventToObservers(service.qntResultsItem);
    expect(spyFnc).toHaveBeenCalledTimes(1)
    expect(spyFnc).toHaveBeenCalledWith(service.qntResultsItem);
  })
})