function log(...arg) {
  Reflect.apply(console.log, null, arg);
}

function J(data) {
  log(JSON.stringify(data, null, 2));
}

exports = module.exports = {
  log,
  J
};
