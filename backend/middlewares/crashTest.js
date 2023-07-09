module.exports = () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
};
