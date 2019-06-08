async function api1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: 'rc',
        gender: 1
      });
    }, 1000);
  });
}

async function api2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2);
    }, 1000);
  });
}

module.exports = {
  api1,
  api2
};