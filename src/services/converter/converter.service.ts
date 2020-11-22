export class Converter {
  
  binaryToDecimal(binary:string):number {
    let decimal = 0;
    const binarySequence = binary.split('');
    const binaryLength = binarySequence.length;
    binarySequence.forEach((binaryUnity, index)=>{
      const currentPower = binaryLength-(index + 1);
      const currentPowerValue = Math.pow(2, currentPower);
      decimal += parseInt(binaryUnity) * currentPowerValue;
    })
    return decimal;
  }
}