# Full Stack Engineer Challenge

> This repository contains the challenge for full stack engineers.

- [Devops Exercise](#devops-exercise)
- [Backend Exercise](#backend-exercise)
- [Frontend Exercise](#frontend-exercise)

**Note:** Please don't fork this repository, or create a pull request against it. Otherwise other applicants may take inspiration from it. Once the coding challenge is completed, you can submit it via this [Google form](https://forms.gle/f2hekWPJqee6htH28).

## Devops Exercise

The backend and frontend exercises should be contained in one repository (monorepo), with the following directory layout:

```bash
├── api
├── dashboard
├── docker-compose.yml
└── README.md # documentation for this repo
```

The `api` and `dashboard` directories should have their own simple `Dockerfile`, so that they can be built and run locally.

The `docker-compose.yml` file should define both the `api` and `dashboard` as services, which will be automatically built and started upon calling `docker-compose up`.

__Things you don’t have to worry about:__

- CI configuration / Deployment
- Secret Management

## Backend Exercise

The project should be made available in the `api` directory with meaningful commit messages. Use Node.js and any framework, if you want to use one.

Implement a **simple REST API** to create and retrieve a Security Scan Result (“Result”). The Result entity should have the following properties:

- Id: (unique)
- Status: (Queued, In Progress, Success, Failure)
- RepositoryName: String
- Findings: JSONB, see [example](example-findings.json)
- QueuedAt: timestamp
- ScanningAt: timestamp
- FinishedAt: timestamp

The Result entity should be stored in a database (any). Wherever you’d have to add something that you feel requires product subscriptions or significant extra time, just mention it in the README.md file.

__Things you don’t have to worry about:__

- CI configuration / Deployment
- APM
- Authentication / Authorisation / Auditing

## Frontend Exercise

The project should be made available in a the `dashboard` directory with meaningful commit messages. You should use ReactJS and JavaScript.

Implement a simple dashboard that has three screens:

1. Display a form that allows submitting a scan result
2. Displays a list of security scan results.
The list should display the name of the repository, the status of the scan, and the according timestamp.
If the Scan Report contains findings, display the number in a badge.
3. Displays the findings for a selected security scan. 

Once a scan report was selected, display a list of findings:

- RuleId of the finding
- Description of the finding
- Severity of finding
- Path name and line of code of the finding

The application is fairly simple, so you might not want to use any state management libraries – in this case please make sure your state management is clean, simple and easy to test. Wherever you’d have to add something that you feel requires product subscriptions (e.g. Logging 3rd party service) or significant extra time, just mention it in the README.md file.

__Things you don’t have to worry about:__

- Making it super pretty: The UI should be clean and properly aligned however it does not
need any extraneous CSS and/or animations. You can use any UI framework you like.
- CI configuration / Deployment
