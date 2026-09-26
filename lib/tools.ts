export function calculator(expression: string) {
  try {
    if (!/^[0-9+\-*/().%\s]+$/.test(expression)) {
      return "Invalid mathematical expression.";
    }

    const result = Function(`"use strict"; return (${expression})`)();

    return String(result);
  } catch {
    return "Could not calculate the expression.";
  }
}