const patterns = {
  // uuid
  RFC4122: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  // from https://github.com/shinnn/github-username-regex
  github: /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i,
  ruleId: /^[A-Z][0-9]{3,6}$/,
  punctuation: count =>
    new RegExp(`^[a-zA-Z0-9 \/\(\)_\,\.\?\-]{0,${count}}$`, "g"),
  underscore: count => new RegExp(`^[a-zA-Z0-9_\/]{0,${count}}$`, "g"),
  path: count => new RegExp(`^[a-zA-Z0-9_\/\.]{0,${count}}$`, "g"),
};

const matches = {
  safe: "abcdef",
  alphanumeric: "abcdef123",
  punctuation: "abcdef123.-?",
  underscore: "abcdef_",
  file: "abcdef123/test.json",
  rule: "G401",
};

// valid status values
const status = ["Queued", "In Progress", "Success", "Failure"];
// valid timestamps, 3 year data retention
const clocker = value =>
  (value > Date.now() / 1000) - 3 * 365 * 24 * 60 * 60 && value < Date.now();

module.exports = { patterns, matches, status, clocker };
