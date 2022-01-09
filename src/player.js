const playerFactory = () => {
  const isCPU = false;

  const randomPlay = () => [
    Math.round(Math.random() * 10),
    Math.round(Math.random() * 10),
  ];

  return {
    isCPU,
    randomPlay,
  };
};

module.exports = playerFactory;
