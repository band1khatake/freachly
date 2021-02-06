module.exports = {
  error(...rest) {
    console.error(new Date().toISOString(), 'error:', ...rest);
  },
  warn(...rest) {
    console.warn(new Date().toISOString(), 'warn:', ...rest);
  },
  info(...rest) {
    console.info(new Date().toISOString(), 'info:', ...rest);
  },
  debug(...rest) {
    console.debug(new Date().toISOString(), 'debug:', ...rest);
  },
};
