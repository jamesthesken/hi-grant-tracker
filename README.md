# Hawaii Non-Profit Grant Tracker
Webpage that is updated for grants and funding opportunities, relevant to non-profits operating in the State of Hawaii.

[Demo](https://hi-grant-tracker.herokuapp.com)

## Technical Details
Built with:
* [Docker](https://www.docker.com)
* [Node.js](https://nodejs.org/en/)
* [Bulma CSS](https://bulma.io)
* [Google Sheets API wrapper for javascript](https://github.com/theoephraim/node-google-spreadsheet)
* [Tabulator](https://tabulator.info)

### Application Flow
The database for the application is a Google Sheet, which is auto-populated by a Google Form. Doing so allows for a standardized data format to be ingested by the NodeJS API layer. 

The API is located in `app.js`, which handles authentication and data collection from the Google Sheet. An example output of the data is the following JSON response:

```
result: [
    {
        "lastUpdated":"6/10/2021 10:11:35",
        "funder":"The Home Depot",
        "federal":"No",
        "title":"COMMUNITY IMPACT GRANTS ",
        "description":"Supports housing modifications/repair projects for vulnerable and underserved populations and Veteran service organization projects directly impacting the lives of veterans.",
        "eligibility":"Nonprofit, Tax-exempt public service agencies in the U.S.",
        "programFunding":"Unspecified",
        "minAward":"Unspecified",
        "maxAward":"$5,000",
        "dueDate":"12/31/2021",
        "url":"https://corporate.homedepot.com/foundation/communityimpactgrants"
    }
]

```

The logic for the table is located in `public/index.js`. The library supports fetching data from a remote source (i.e. our API), and has lots of features to customize (future work).

## Building and Running
Create a file called `config.js`, which holds your API keys to interact with Google's API:
```
module.exports = {
    'HOSTPATH': 'http://localhost',
    'PORT': 3000,
    'client_email': 'YOUR_CLIENT_EMAIL',
    'private_key': 'YOUR_PRIVATE_KEY',
    'REDIRECT_PATH': '/redirect'
   };
```
For more information, please refer to the docs for [node-google-spreadsheet](https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication).

Install Docker and Docker-Compose:
```
git clone https://github.com/jamesthesken/hi-grant-tracker.git
cd hi-grant-tracker/
docker-compose up --build
```