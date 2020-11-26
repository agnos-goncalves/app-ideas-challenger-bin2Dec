import { Converter } from "./converter.service";

describe('Class Converter', () => {
  let instance:Converter;
  beforeEach(() => {
    instance = new Converter();
  });
  test('binaryToDecimal should converter binary to decimal number', ()=>{
    expect(instance.binaryToDecimal('1111')).toBe(15);
  })
  test('isValidBinary should check value is valid binary', ()=>{
    expect(instance.isValidBinary('1000A')).toBeFalsy();
    expect(instance.isValidBinary('1001')).toBeTruthy();
  })
})