const createPosition = ({ key = "begin", position = {} } = {}) => ({
  // key value, even if empty, keep to allow access without throws
  [key]: position,
});

const withPosition = location => ({
  ...location.positions,
  ...createPosition(),
});

module.exports = { withPosition };
