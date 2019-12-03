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

The `api` and `dashboard` directories should have their own simple `Dockerfile`, so that they can be built and run individually.

The `docker-compose.yml` file should define both the `api` and `dashboard` as services, which will be automatically built and started upon calling `docker-compose up`. A container for a DB can be defined here as well.

__Things you don’t have to worry about:__

- CI configuration / Deployment
- Secret Management

## Backend Exercise

The project should be made available in the `api` directory with meaningful commit messages. Use Node.js and any framework, if you want to use one.

Implement a **simple REST API** to **CRUD** a Security Scan Result (“Result”). The Result entity should have the following properties:

- Id: any type of unique id
- Status: "Queued" | "In Progress" | "Success" | "Failure"
- RepositoryName: string
- Findings: JSONB, see [example](example-findings.json)
- QueuedAt: timestamp
- ScanningAt: timestamp
- FinishedAt: timestamp

The Result entity should be stored in a database (of your choise). Wherever you’d have to add something that you feel requires product subscriptions or significant extra time, just mention it in the README.md file.

__Things you don’t have to worry about:__

- CI configuration / Deployment
- APM
- Authentication / Authorization / Auditing

## Frontend Exercise

The project should be made available in a the `dashboard` directory with meaningful commit messages. You should build it using ReactJS.

Implement a simple dashboard that has three **separated** screens:

1. First screen will only display a form that will allow to submit a scan result.

2. Second screen will only display the list of security scan results. The columns of the list should be: repository name, scan status, findings (is the quantity of findings and should be displayed on a badge/label component, [example here](https://react.semantic-ui.com/elements/label/)), and the according timestamp (i.e.: if `Status` is `Queued`, use `QueuedAt`). 

3. Third screen will only display the list of findings for a selected security scan (selected from the screen number 2) with the following 4 columns: RuleId, Description, Severity and Path name : line number.

The application is fairly simple, so you might not want to use any state management libraries – in this case please make sure your state management is clean, simple and easy to test. As well, we value the use of the latest features of react, _but only if you use them properly_. Wherever you’d have to add something that you feel requires product subscriptions (e.g. Logging 3rd party service) or significant extra time, just mention it in the README.md file.

__Things you don’t have to worry about:__

- Making it super pretty: The UI should be clean and properly aligned however it does not
need any extraneous CSS and/or animations. You can use any UI framework you like.
- CI configuration / Deployment
