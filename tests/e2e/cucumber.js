module.exports = {
  default: {
    paths: ["features/**/*.feature"],
    require: ["steps/**/*.js", "world.js"],
    publishQuiet: true,
    defaultTimeout: 20000,
  },
};
