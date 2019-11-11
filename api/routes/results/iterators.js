const iterators = {
  findings: (result = { findings: [] }, command = () => {}, params = []) => {
    result.findings.forEach(finding => command(finding, ...params));
    return true;
  },
  positions: (
    finding = { location: { positions: {} } },
    liner = () => {},
    indexer = () => {},
    linerParams = [],
    indexerParams = []
  ) => {
    Object.keys(finding.location.positions).forEach(index => {
      liner(finding.location.positions[index].line, ...linerParams);
      indexer(index, ...indexerParams);
    });
    return true;
  },
};

module.exports = { iterators };
