const { fields } = require("../utilities/validation");

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

/**
 * Nest objects under a key, filtered by /utilities/validation.fields
 *
 * @param {string} key Names top level index and selects whitelist
 * @param  {Object[]} objects Merges under `key`
 */
const whitelist = (key, objects) => {
  return {
    [key]: objects
      .filter(object => fields[key].includes(Object.keys(object)[0]))
      .reduce((cur, prev) => ({ ...cur, ...prev }), {}),
  };
};
module.exports = { pipe, whitelist };
