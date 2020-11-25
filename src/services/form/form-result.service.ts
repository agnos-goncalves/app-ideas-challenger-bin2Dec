export type resultItem = {
  binary:string;
  decimal:number
}

export class FormResult {
  formSelector:string;
  listResultSelector:string;
  qntResultsItem = 0;
  private observers:Function[] = [];
  get form():HTMLFormElement{
    return document.querySelector(this.formSelector);
  }
  get listResult():HTMLDataListElement{
    return document.querySelector(this.listResultSelector);
  }
  constructor(formSelector:string, listResultSelector:string){
    this.formSelector = formSelector;
    this.listResultSelector = listResultSelector;
    this.form.querySelector('button').addEventListener('click', this.onHandleClear.bind(this))
  }
  getHtmlElementResultItem(item:resultItem):HTMLElement {
    const li = document.createElement('li');
    li.className = 'box-converter-result__item';
    li.innerHTML = `
      <label>Binary:</label>
      <span>${item.binary}</span>
      <label>Decimal:</label>
      <span>${item.decimal}</span>
    `;
    return li;
  }
  addResult(item:resultItem): void {
    const li = this.getHtmlElementResultItem(item);
    this.qntResultsItem++;
    this.listResult.prepend(li);
    this.dispatchEventToObservers(this.qntResultsItem);
  }
  clearResult():void {
    this.listResult.innerHTML = '';
  }
  onHandleClear():void {
    this.qntResultsItem = 0;
    this.clearResult();
    this.dispatchEventToObservers(this.qntResultsItem);
  }
  onChange(callback:Function):void {
    this.observers.push(callback);
  }
  dispatchEventToObservers(qntResults:any){
    this.observers.forEach((observer:Function)=>{
      observer(qntResults);
    })
  }
}