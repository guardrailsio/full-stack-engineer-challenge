const tap = require("tap");
const { get } = require("../routes/results");

const RFC4122 = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
// from https://github.com/shinnn/github-username-regex
const github = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

const typeCheck = result => {
  tap.match(result.id, RFC4122, "id is GUID");
  tap.ok(
    ["Queued", "In Progress", "Success", "Failure"],
    includes(result.status),
    "status is in range"
  );
  tap.match(result.repositoryName, github, "repo is valid github slug");
  timestampCheck(result.queuedAt, "queuedAt");
  timestampCheck(result.scanningAt, "scanningAt");
  timestampCheck(result.finishedAt, "finishedAt");
  result.findings.foreach(finding => findingCheck(finding));
};

const findingCheck = finding => {
  tap.match(
    finding.ruleId,
    /[A-Z][0-9]{3,6}/,
    "ruleId starts with a letter and then 3 to 6 numbers"
  );
  tap.match(
    finding.metadata.description,
    /"[a-zA-Z0-9_\,\.\?\-]{0,100}"/,
    "description alphanumeric allowable underscore and punctuation, 100 limit"
  );
  tap.match(
    finding.metadata.severity,
    /"[a-zA-Z0-9_]{0,12}"/,
    "severity alphanumeric allowable underscore, 12 limit"
  );
  tap.match(
    finding.location.path,
    /"[a-zA-Z0-9_\/]{0,30}"/,
    "path alphanumeric allowable underscore and slash, 30 limit"
  );
  tap.match(
    Object.keys(finding.location.positions).foreach(index => {
      const position = finding.location.positions[index];
      tap.ok(Number.isInteger(position.line));
      tap.match(
        index,
        /"[a-zA-Z0-9_]{0,12}"/,
        "location position index is alphanumeric allowable underscore, 12 limit"
      );
    })
  );
};

const timestampCheck = (timestamp, label) => {
  tap.ok(new Date(timestamp).getTime() > 0, `${label} is valid timestamp`);
  tap.ok(
    timestamp > Date.now() / 1000 - 3 * 365 * 24 * 60 * 60,
    `${label} is less than 3 years old`
  );
};

const result = get();
tap.test("get() smoke test", t => {
  typeCheck(result);
});
