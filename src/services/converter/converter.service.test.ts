import { Converter } from "./converter";

describe('Class Converter', () => {
  let instance:Converter;
  beforeEach(() => {
    instance = new Converter();
  });
  test('created', ()=>{
    expect(true).toBeTruthy();
  })
})