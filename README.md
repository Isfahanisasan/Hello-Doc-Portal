# # Hello Doc

Hello Doc is a web application that has it's main purpose as a portal that connects patients and doctors. Allowing them a platform to make and organize appointments.

There are 2 types of users in Hello Doc, one is the patient user, and one is the doctor user.

# Installation

Install NodeJS LTS (18.x) or older to run the app.
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```

Clone the repository
```bash
git clone https://github.com/Bugs-Squasher2023/Bugs-Squasher.git
```
Install dependencies in the FrontEnd Client
```bash
cd Bugs-Squasher
cd halodoc
npm i
```
Install dependencies in the BackEnd Server
```bash
cd ..
cd server
npm i
```
# Run The App

In the first terminal, run
```bash
cd Bugs-Squasher
cd halodoc
npm start
```
In the second terminal run
```bash
cd Bugs-Squasher
cd server
npm run server
```
## Contributing

