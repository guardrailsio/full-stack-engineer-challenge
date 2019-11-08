const tap = require("tap");
const { get, post } = require("../routes/results");

const RFC4122 = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
// from https://github.com/shinnn/github-username-regex
const github = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

const typeCheck = result => {
  tap.match(result.id, RFC4122, "id is GUID");
  tap.ok(
    ["Queued", "In Progress", "Success", "Failure"].includes(result.status),
    "status is in range"
  );
  tap.match(result.repo, github, "repo is valid github slug");
  timestampCheck(result.queuedAt, "queuedAt");
  timestampCheck(result.scanningAt, "scanningAt");
  timestampCheck(result.finishedAt, "finishedAt");
  result.findings.forEach(finding => findingCheck(finding));
};

const findingCheck = finding => {
  tap.match(
    finding.ruleId,
    /[A-Z][0-9]{3,6}/,
    "ruleId starts with a letter and then 3 to 6 numbers"
  );
  tap.match(
    finding.metadata.description,
    /[a-zA-Z0-9_\,\.\?\-]{0,100}/,
    "description alphanumeric allowable underscore and punctuation, 100 limit"
  );
  tap.match(
    finding.metadata.severity,
    /[a-zA-Z0-9_]{0,12}/,
    "severity alphanumeric allowable underscore, 12 limit"
  );
  tap.match(
    finding.location.path,
    /[a-zA-Z0-9_\/]{0,30}/,
    "path alphanumeric allowable underscore and slash, 30 limit"
  );
  tap.match(
    Object.keys(finding.location.positions).forEach(index => {
      const position = finding.location.positions[index];
      tap.ok(Number.isInteger(position.line));
      tap.match(
        index,
        /[a-zA-Z0-9_]{0,12}/,
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

tap.ok(get(), "get() works with no parameters");

tap.test("get() returns valid types", t => {
  typeCheck(get());
  t.end();
});

tap.test("get(:id) returns record with matching id", t => {
  const result = get("2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d");
  typeCheck(result);
  t.equals(result.id, "2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d");
  t.end();
});

tap.ok("works with no parameters", post());

tap.test("post() returns valid types", t => {
  typeCheck(post());
  t.end();
});
