import { Converter } from "./converter";

describe('Class Converter', () => {
  let instance:Converter;
  beforeEach(() => {
    instance = new Converter();
  });
  test('binaryToDecimal should converter binary to decimal number', ()=>{
    expect(instance.binaryToDecimal('1111')).toBe(15);
  })
})