# Hawaii Non-Profit Grant Tracker
Small webpage that is updated for grants and funding opportunities, relevant to non-profits operating in the State of Hawaii.

[Demo](https://hi-grant-tracker.herokuapp.com)

## Technical Details
Built with:
* [Docker](https://www.docker.com)
* [Node.js](https://nodejs.org/en/)
* [Bulma CSS](https://bulma.io)
* [Google Sheets API wrapper for javascript](https://github.com/theoephraim/node-google-spreadsheet)
* [Grid.js] (https://gridjs.io)

Node.js connects to a Google Sheet, which automatically fills the searchable HTML table.

## Building and Running
Install Docker and Docker-Compose:
```
git clone https://github.com/jamesthesken/hi-grant-tracker.git
cd hi-grant-tracker/
docker-compose up --build
```