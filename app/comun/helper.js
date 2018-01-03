export function manejarError(errorCode) {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'El correo electrónico no es válido, ya se encuentra registrado';

      break;
    case 'auth/invalid-email':
      return 'El correo electrónico no tiene un formato válido';

      break;
    case 'auth/weak-password':
      return 'El password debe tener al menos 6 carcacteres';

      break;
    default:
      return errorCode;

    // etc
  }
}
