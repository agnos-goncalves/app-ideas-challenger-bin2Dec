type FormConversorConfig = {
  container:string;
  field:string;
  button:string;
}

type FormConversorConfigSelectors = {
  container:Element;
  field:Element;
  button:Element;
}
export class FormConversor {
  private form:FormConversorConfigSelectors;

  constructor(config:FormConversorConfig){
    this.formPropertiesInitializer(config);
  }

  formPropertiesInitializer(config:FormConversorConfig):void {
    const {container, field, button} = config;
    this.form.container = document.querySelector(container);
    this.form.field = this.form.container.querySelector(field);
    this.form.button = this.form.container.querySelector(button);
  }

  isValidBinary(value:string):boolean {
    return /^[01]+$/.test(value);
  }
  

  getFieldValue(event:Event):string {
    event.stopPropagation();
    event.preventDefault();
    return this.form.field.getAttribute('value');
  }
  
}