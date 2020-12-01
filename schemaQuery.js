const fs = require('fs')
const fetch = require('node-fetch')
require('dotenv').config()
console.log(
  'fetching: ',
  process.env.BACKEND_PRIVATE_URL + process.env.GQ_API_PATH
)
fetch(process.env.BACKEND_PRIVATE_URL + process.env.GQ_API_PATH, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    variables: {},
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
})
  .then((result) => result.json())
  .then((result) => {
    console.log('fetched')
    // here we're filtering out any type information unrelated to unions or interfaces
    const filteredData = result.data.__schema.types.filter(
      (type) => type.possibleTypes !== null
    )
    result.data.__schema.types = filteredData
    fs.writeFileSync(
      './apollo/client-configs/fragmentTypes.json',
      JSON.stringify(result.data),
      (err) => {
        if (err) {
          console.error('Error writing fragmentTypes file', err)
        } else {
          console.log('Fragment types successfully extracted!')
        }
      }
    )
    console.log('done!')
  })
