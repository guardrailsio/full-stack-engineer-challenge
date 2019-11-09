import { builtinModules } from "module";

// uuid
const RFC4122 = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
// from https://github.com/shinnn/github-username-regex
const github = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
// valid status values
const status = ["Queued", "In Progress", "Success", "Failure"];
// valid timestamps, 3 year data retention
const retention = value => value > Date.now() / 1000 - 3 * 365 * 24 * 60 * 60;

module.exports({ RFC4122, github, status, retention });
