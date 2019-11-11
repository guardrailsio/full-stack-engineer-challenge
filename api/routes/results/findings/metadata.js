const createMetadata = ({ description = "", severity = {} } = {}) => ({
  description,
  severity,
});

const withMetadata = finding => ({
  ...finding,
  ...{ metadata: createMetadata() },
});

module.exports = { withMetadata };
