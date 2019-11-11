const { pipe } = require("../../../utilities/frp");
const { withPosition } = require("./location/positions");

const createLocation = ({ path = "", positions = {} } = {}) =>
  pipe(withPosition)({
    path,
    positions,
  });

const withLocation = finding => ({
  ...finding,
  ...{ location: createLocation() },
});

module.exports = { withLocation };
