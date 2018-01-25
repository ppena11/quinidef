export const defaultplaceholder = 'Correo electrónico...';
export const defaultplaceholderc = 'Contraseña...';

export function manejarError(errorCode) {
  switch (errorCode) {
    case 'auth/user-disabled':
      return {
        placeholderc: defaultplaceholderc,
        password: '',
        email: '',
        authenticating: false,
        placeholder: defaultplaceholder,
        error: 'Correo electrónico deshabilitado',
      };
      break;
    case 'auth/invalid-email':
      return {
        placeholderc: defaultplaceholderc,
        password: '',
        email: '',
        authenticating: false,
        placeholder: defaultplaceholder,
        error: 'Correo electrónico inválido',
      };
      break;
    case 'auth/user-not-found':
      return {
        placeholderc: defaultplaceholderc,
        password: '',
        email: '',
        authenticating: false,
        placeholder: defaultplaceholder,
        error: 'Correo electrónico no registrado',
      };
      break;
    case 'auth/wrong-password':
      // this.inputCorreo.placeholder = emailAddress;
      return {
        placeholderc: defaultplaceholderc,
        password: '',
        authenticating: false,
        // placeholder: emailAddress,
        error: 'Contraseña incorrecta',
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
        placeholderc: defaultplaceholderc,
        password: '',
        email: '',
        authenticating: false,
        placeholder: defaultplaceholder,
        error: 'Muchos intentos fallidos, intente luego',
      };
      break;

    case 'auth/email-already-in-use':
      return {
        placeholderc: defaultplaceholderc,
        password: '',
        email: '',
        authenticating: false,
        placeholder: defaultplaceholder,
        error: 'Correo electrónico ya registrado',
      };
      break;

    case 'auth/weak-password':
      return {
        placeholderc: defaultplaceholderc,
        password: '',
        authenticating: false,
        placeholder: defaultplaceholder,
        error: 'El password debe tener al menos 6 caracteres',
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
