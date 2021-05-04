export const delay = async (delayInms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
};

export default {
  delay,
};
