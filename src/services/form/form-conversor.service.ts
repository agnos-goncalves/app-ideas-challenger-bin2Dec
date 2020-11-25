import { Converter } from "../converter/converter.service";

export type submitPayload = {
  binary:string;
  decimal:number
}

export class FormConversor {

  private converter:Converter;
  private currentBinary:string;
  private observers:Function[] = [];
  formSelector:string;

  get form():HTMLFormElement {
    return document.querySelector(this.formSelector)
  }
  
  constructor(formSelector:string){
    this.formSelector = formSelector;
    this.converter = new Converter();
    this.addEventsListeners();
  }  

  addEventsListeners():void {
    this.form.querySelector('button').addEventListener('click', this.onHandleSubmit.bind(this));
    this.form.querySelector('input').addEventListener('keyup', this.onHandleFieldValueChange.bind(this));
  }
  
  onHandleSubmit(event:Event):void {
    event.stopPropagation();
    event.preventDefault();
    const binary = this.currentBinary;
    const isValidBinary = this.converter.isValidBinary(binary);
    if(isValidBinary){
      const decimal = this.converter.binaryToDecimal(binary);
      this.submit({binary, decimal});
      this.form.reset();
      (<HTMLFormElement>event.target).blur();
      this.currentBinary = undefined;
    }
  }

  onHandleFieldValueChange(event:Event):void {
    event.stopPropagation();
    event.preventDefault();
    const binary = (<HTMLInputElement>event.target).value;
    const isValidBinaryAttribute = 
      binary === '' ||
      this.converter.isValidBinary(binary) ? 'true' : 'false';

    this.currentBinary = binary;
    this.form.setAttribute('valid', isValidBinaryAttribute);
  }

  submit(submitPayload:submitPayload):void {
    this.observers.forEach((observer:Function)=>{
      observer(submitPayload);
    })
  }

  onSubmit(callback:Function):void {
    this.observers.push(callback);
  }
}
