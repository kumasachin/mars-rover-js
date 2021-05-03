export const CONFIG = {
  MAX_COORDINATE_LENGTH: 50,
  DIRECTIONS: ['N', 'S', 'E', 'W'],
  INSTUCTIONS: ['L', 'R', 'M'],
  PATH: {
    marsapi: '/mars-robot',
  },
  LEFT: {
    N: 'W',
    W: 'S',
    S: 'E',
    E: 'N',
  },
  RIGHT: {
    N: 'E',
    E: 'S',
    S: 'W',
    W: 'N',
  },
  FRONT: {
    N: 'yaxis',
    S: 'yaxis',
    E: 'xaxis',
    W: 'xaxis',
  },
};

export default CONFIG;
