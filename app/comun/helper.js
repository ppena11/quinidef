export function manejarError(errorCode) {
  switch (errorCode) {
    case 'auth/user-disabled':
      return {
        placeholderc: 'Contraseña...',
        password: '',
        email: '',
        authenticating: false,
        placeholder: 'Ingresa tu correo electrónico...',
        error: 'El correo electrónico ha sido deshabilitado',
      };
      break;
    case 'auth/invalid-email':
      return {
        placeholderc: 'Contraseña...',
        password: '',
        email: '',
        authenticating: false,
        placeholder: 'Ingresa tu correo electrónico...',
        error: 'El correo electrónico no tiene un formato válido',
      };
      break;
    case 'auth/user-not-found':
      return {
        placeholderc: 'Contraseña...',
        password: '',
        email: '',
        authenticating: false,
        placeholder: 'Ingresa tu correo electrónico...',
        error: 'El correo electrónico no se encuentra registrado',
      };
      break;
    case 'auth/wrong-password':
      // this.inputCorreo.placeholder = emailAddress;

      return {
        placeholderc: 'Contraseña...',
        password: '',
        authenticating: false,
        // placeholder: emailAddress,
        error: 'La contraseña es incorrecta',
      };
      break;

    case 'auth/network-request-failed':
      // this.inputCorreo.placeholder = emailAddress;

      return {
        // placeholderc: password,
        authenticating: false,
        // placeholder: emailAddress,
        error: 'Problema de conexión a internet',
      };
      break;

    case 'auth/too-many-requests':
      // this.inputCorreo.placeholder = emailAddress;

      return {
        placeholderc: 'Contraseña...',
        password: '',
        email: '',
        authenticating: false,
        placeholder: 'Ingresa tu correo electrónico...',
        error: 'Muchos intentos fallidos, intenta luego',
      };
      break;

    case 'auth/email-already-in-use':
      return {
        placeholderc: 'Contraseña...',
        password: '',
        email: '',
        authenticating: false,
        placeholder: 'Ingresa tu correo electrónico...',
        error: 'El correo electrónico no es válido, ya se encuentra registrado',
      };
      break;

    case 'auth/weak-password':
      return {
        placeholderc: 'Contraseña...',
        password: '',
        authenticating: false,
        placeholder: 'Ingresa tu correo electrónico...',
        error: 'El password debe tener al menos 6 carcacteres',
      };
      break;

    default:
      return {
        authenticating: false,
        error: errorCode,
      };
    // etc
  }
}
