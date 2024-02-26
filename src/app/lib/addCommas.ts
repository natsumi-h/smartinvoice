export function addCommasToNumber(numberValue: number) {
  return numberValue.toLocaleString("en-US", {
    minimumFractionDigits: 2, // 小数点以下最小桁数
    maximumFractionDigits: 2, // 小数点以下最大桁数
  });
}
