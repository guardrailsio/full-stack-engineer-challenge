const tap = require("tap");
const { iterators } = require("../../routes/results/iterators");
const { findingsTypeChecker } = require("../../routes/results/validate");
const { matches } = require("../../utilities/validation");

tap.ok(iterators.findings(), "iterators.findings() works with no parameters");

tap.ok(
  iterators.findings({
    findings: [
      {
        ruleId: matches.ruleId,
        metadata: {
          description: matches.punctuation,
          severity: matches.underscore,
        },
        location: {
          path: matches.path,
          positions: {
            [matches.underscore]: {
              line: 60,
            },
          },
        },
      },
    ],
    findingsTypeChecker,
  }),
  "iterator.findings() works with valid types"
);

tap.ok(
  iterators.findings({ findings: [true, true] }, tap.ok),
  "iterator.findings() runs a command for each finding"
);

tap.ok(
  iterators.findings({ findings: ["params", "params"] }, tap.match, [/params/]),
  "iterator.findings() expands parameters"
);

tap.ok(iterators.positions(), "iterators.positions() works with no parameters");

tap.ok(
  iterators.findings({
    findings: [
      {
        ruleId: matches.ruleId,
        metadata: {
          description: matches.punctuation,
          severity: matches.underscore,
        },
        location: {
          path: matches.path,
          positions: {
            [matches.underscore]: {
              line: 60,
            },
          },
        },
      },
    ],
    findingsTypeChecker,
  }),
  "iterator.positions() works with valid types"
);

tap.ok(
  iterators.positions(
    { location: { positions: { begin: { line: true }, end: { line: true } } } },
    tap.ok,
    tap.ok
  ),
  "iterator.positions() runs a command for each position[index].line"
);

tap.ok(
  iterators.positions(
    { location: { positions: { begin: { line: 1 }, end: { line: 1 } } } },
    tap.match,
    tap.match,
    [/1/],
    [/begin|end/]
  ),
  "iterator.positions() expands parameters"
);
