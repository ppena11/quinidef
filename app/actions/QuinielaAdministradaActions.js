import { QUINIELA_ADMINISTRADA_UPDATE } from './types';

export const QuinielaAdministradaUpdate = ({ prop, value }) => ({
  type: QUINIELA_ADMINISTRADA_UPDATE,
  payload: { prop, value },
});
