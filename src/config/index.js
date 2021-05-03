export const CONFIG = {
  MAX_COORDINATE_LENGTH: 50,
  DIRECTIONS: ['N', 'S', 'E', 'W'],
  INSTUCTIONS: ['L', 'R', 'F'],
  PATH: {
    marsapi: '/mars-robot',
  },
  LEFT_TURN_MAP: {
    N: 'W',
    W: 'S',
    S: 'E',
    E: 'N',
  },
  RIGHT_TURN_MAP: {
    N: 'E',
    E: 'S',
    S: 'W',
    W: 'N',
  },
};

export default CONFIG;
