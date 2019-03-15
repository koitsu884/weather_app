# Weather app
Shows city list and can get current weather and time for each city
(NodeJS + React + MongoDB)

## Setting up
### install packages
npm install
npm run client-install
(Alternatively, move foldert to client and run command 'npm install')

### create key files
#### Mongo DB
Under config folder, need to create 'keys_dev.js' and set mongoURI
ex.
module.exports = {
    mongoURI:'mongodb+srv://Kazu:***************@cluster0-fffff.mongodb.net/youngshand?retryWrites=true',
};

#### API
Under client/source/apis folder, need to create 'key.js' and set keys for weather and time API
ex.
module.exports = {
    weather: '432lkpkladlpLPflppdalo',
    time: 'fkaofkaojmera744kqof8al2'
}

Currentry using -
Weather API from Open weather map (https://openweathermap.org/)
Getting current time API from World weather online (https://www.worldweatheronline.com)

# Available scripts
## npm server
will run commands 'nodemon server.js'

## npm client
will run commands 'npm start --prefix client'

## client-install
will run commands 'npm install --prefix client'

## npm run dev
Run commands 'npm run server' and 'npm run client' at once
