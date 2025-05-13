export const verifyText = (text: string) => {
  const hasSpecialChar = /[_.,*#\/\-]/.test(text);
  const digits = (text?.match(/\d/g) || []).length;

  if (text?.length < 5 || text?.length > 20) {
    return 'Debe tener entre 5 y 20 caracteres.';
  } else if (hasSpecialChar) {
    return 'No puede contener caracteres especiales.';
  } else if (digits > 3) {
    return 'Máximo 3 números permitidos.';
  } else if (/^\d+$/.test(text)) {
    return 'No puede ser solo números.';
  } else {
    return undefined;
  }
};

export const randomLetters = (length: number) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
