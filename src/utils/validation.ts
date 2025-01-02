export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateFileSize(size: number, maxSize: number): boolean {
  return size <= maxSize;
}

export function validateFileType(type: string, allowedTypes: string[]): boolean {
  return allowedTypes.includes(type);
}

export function validateLength(text: string, min: number, max: number): boolean {
  return text.length >= min && text.length <= max;
}