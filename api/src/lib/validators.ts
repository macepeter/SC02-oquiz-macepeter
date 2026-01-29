export function isValidPassword(password: string) {
  //  Idée de validations pour un mot de passe:

  //  - Au moins une majuscule
  if(!/[A-Z]/.test(password)) {
    return false;
  }

  //  - Un caractère spéciale
  if(!/[!@#$%^&*(),.?":{}|<>;'`~]/.test(password)) {
    return false;
  }

  //  - Au moins un nombre
  if(!/[0-9]/.test(password)) {
    return false;
  }

  //  - Entre 12 et 24 caractères
  if(password.length < 12 || password.length > 24) {
    return false;
  }

  return true;
}