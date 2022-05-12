const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const JiraClient = require("jira-connector");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

const jira = new JiraClient({
    host: "payal-test.atlassian.net",
    basic_auth: {
        username: "payalpatel0260@gmail.com",
        password: "zEfHCtom751Ih9MKCvoo005B"
    },
    strictSSL: false,
});

app.get("/", (req, res) => { 
    console.log("This is Jira Plugin Project.")
});

app.post("/", (req, res) => { 
    
    if (req.body.status === "success") {
        jira.issue.createIssue({
            fields: {
                project: {
                    key: "TEST",
                },
                summary: "Jira plugin testing API. (Using POST method)",
                description: "This Jira issue is created by testing plugin.",
                issuetype: {
                    name: "Story"
                }
            },
            function (error, issue) {
                console.log("Error", error);
                console.log("Issue", issue);
            }
        });
    } else { 
        console.log("Status: Error")
    }
    res.send("Project started.");
});

app.listen(3000, () => console.log("App is listening on PORT 3000"));