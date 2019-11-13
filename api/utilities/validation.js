const patterns = {
  // uuid
  RFC4122: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  // from https://github.com/shinnn/github-username-regex
  github: /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i,
  ruleId: /^[A-Z][0-9]{3,6}$/,
  punctuation: count =>
    new RegExp(`^[a-zA-Z0-9 \/\(\)_\,\.\?\-]{0,${count}}$`, 'g'),
  underscore: count => new RegExp(`^[a-zA-Z0-9_\/]{0,${count}}$`, 'g'),
  path: count => new RegExp(`^[a-zA-Z0-9_\/\.]{0,${count}}$`, 'g')
}

const matches = {
  safe: 'abcdef',
  alphanumeric: 'abcdef123',
  punctuation: 'abcdef123.-?',
  underscore: 'abcdef_',
  file: 'abcdef123/test.json',
  rule: 'G401'
}

// valid status values
const status = ['Queued', 'In Progress', 'Success', 'Failure']
// valid timestamps, 3 year data retention
const clock = value => {
  const now = Date.now() / 1000
  const retention = now - 3 * 365 * 24 * 60 * 60 * 1000
  const result = value > retention && value <= now
  return result
}

// valid result fields
const fields = {
  result: [
    'id',
    'status',
    'repo',
    'findings',
    'queuedAt',
    'scanningAt',
    'finishedAt'
  ],
  findings: ['type', 'ruleId', 'location', 'metadata'],
  location: ['path', 'positions'],
  positions: ['begin', 'end'],
  metadata: ['description', 'severity']
}

const valid = {
  double: {
    id: '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d',
    status: 'Success',
    repo: 'test',
    findings: [
      {
        type: 'sast',
        ruleId: 'G402',
        location: {
          path: 'connectors/apigateway.go',
          positions: {
            begin: {
              line: 60
            }
          }
        },
        metadata: {
          description: 'TLS InsecureSkipVerify set true.',
          severity: 'HIGH'
        }
      },
      {
        type: 'sast',
        ruleId: 'G404',
        location: {
          path: 'util/util.go',
          positions: {
            begin: {
              line: 32
            }
          }
        },
        metadata: {
          description:
            'Use of weak random number generator (math/rand instead of crypto/rand)',
          severity: 'HIGH'
        }
      }
    ],
    queuedAt: Date.now() / 1000,
    scanningAt: Date.now() / 1000,
    finishedAt: Date.now() / 1000
  },
  single: {
    id: '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d',
    status: 'Success',
    repo: 'test',
    findings: [
      {
        type: 'sast',
        ruleId: 'G402',
        location: {
          path: 'connectors/apigateway.go',
          positions: {
            begin: {
              line: 60
            }
          }
        },
        metadata: {
          description: 'TLS InsecureSkipVerify set true.',
          severity: 'HIGH'
        }
      }
    ],
    queuedAt: 1573244611,
    scanningAt: 1573244621,
    finishedAt: 1573244631
  },
  noDate: {
    id: '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d',
    status: 'Success',
    repo: 'test',
    findings: [
      {
        type: 'sast',
        ruleId: 'G402',
        location: {
          path: 'connectors/apigateway.go',
          positions: {
            begin: {
              line: 60
            }
          }
        },
        metadata: {
          description: 'TLS InsecureSkipVerify set true.',
          severity: 'HIGH'
        }
      }
    ]
  }
}

module.exports = { patterns, matches, status, clock, fields, valid }
