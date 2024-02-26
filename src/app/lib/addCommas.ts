export function addCommasToNumber(numberValue: number) {
  return numberValue.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2, 
  });
}
