var test = function() {
  let currentDate = new Date().getTime();
  let timeArray = [];
  for (let i = 10; i >= 0; i--) {
    timeArray.push(currentDate - i * 1000);
  }
  return timeArray.map(item => {
    return {
      label: item,
      value: (Math.random() * 10).toFixed(2),
      value_real: (Math.random() * 10).toFixed(2)
    };
  });
};
module.exports = test;
