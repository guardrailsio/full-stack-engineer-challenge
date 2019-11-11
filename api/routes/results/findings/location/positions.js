const createPosition = ({ key = "begin", position = {} } = {}) => ({
  [key]: position,
});

const withPosition = location => ({
  ...location.positions,
  ...createPosition(),
});

module.exports = { withPosition };
