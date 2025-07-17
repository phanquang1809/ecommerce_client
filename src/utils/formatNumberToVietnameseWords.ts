export const numberToVietnameseWords = (number:number) => {
  const units = ["", "nghìn", "triệu", "tỷ"];
  const numbers = [
    "không",
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín",
  ];

  if (number === 0) return "không đồng";

  let result = "";
  let unitIndex = 0;
  let num = number;

  while (num > 0) {
    const threeDigits = num % 1000;
    if (threeDigits > 0) {
      let temp = "";
      const hundreds = Math.floor(threeDigits / 100);
      const tens = Math.floor((threeDigits % 100) / 10);
      const ones = threeDigits % 10;

      if (hundreds > 0) {
        temp += `${numbers[hundreds]} trăm `;
      }
      if (tens > 0) {
        if (tens === 1) {
          temp += "mười ";
        } else {
          temp += `${numbers[tens]} mươi `;
        }
      }
      if (ones > 0) {
        if (tens > 0 && ones === 1) {
          temp += "mốt ";
        } else if (tens > 1 && ones === 5) {
          temp += "lăm ";
        } else {
          temp += numbers[ones] + " ";
        }
      }

      result = temp + units[unitIndex] + (result ? " " + result : "");
    }
    num = Math.floor(num / 1000);
    unitIndex++;
  }

  return result.trim() + " đồng chẵn";
};
