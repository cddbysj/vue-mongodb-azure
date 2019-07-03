const mongoose = require('mongoose')
const env = require('dotenv').config() // Use the .env file to load the variables

mongoose
  .connect(process.env.COSMOSDB_CONNSTR + '?ssl=true&replicaSet=globaldb', {
    auth: {
      user: process.env.COSMODDB_USER,
      password: process.env.COSMOSDB_PASSWORD
    }
  })
  .then(() => console.log('Connection to CosmosDB successful'))
  .catch(err => console.error(err))

// define Family schama and model
const Family = mongoose.model(
  'Family',
  new mongoose.Schema({
    lastName: String,
    parents: [
      {
        familyName: String,
        firstName: String,
        gender: String
      }
    ],
    children: [
      {
        familyName: String,
        firstName: String,
        gender: String,
        grade: Number
      }
    ],
    pets: [
      {
        givenName: String
      }
    ],
    address: {
      country: String,
      state: String,
      city: String
    }
  })
)

// crate Family object
const family = new Family({
  lastName: 'Volum',
  parents: [{ firstName: 'Thomas' }, { firstName: 'Mary Kay' }],
  children: [
    { firstName: 'Ryan', gender: 'male', grade: 8 },
    { firstName: 'Patrick', gender: 'male', grade: 7 }
  ],
  pets: [{ givenName: '小强' }],
  address: { country: 'USA', state: 'WA', city: 'Seattle' }
})

// save object to CosmosDB
family.save((err, saveFamily) => {
  console.log(JSON.stringify(saveFamily))
})

// define VacationDestinations schama and model
const VacationDestinations = mongoose.model(
  'VacationDestinations',
  new mongoose.Schema({
    name: String,
    country: String
  })
)

// create object
const vacaySpot = new VacationDestinations({
  name: 'Honolulu',
  country: 'USA'
})

vacaySpot.save((err, saveVacay) => {
  console.log(JSON.stringify(saveVacay))
})

// read from db
Family.find({ 'pets.givenName': '小强' }, (err, foundFamily) => {
  foundFamily.forEach(family =>
    console.log(`Found family: ${JSON.stringify(family, null, 2)}`)
  )
})
