// Import axios for making HTTP requests
const axios = require('axios')
const { validateContactData } = require('@jworkman-fs/asl/src/Model/index.js')
const { 
  ServerUnreachableError, 
  ResourceUnreachableError,
  PaginationResultCountError,
  ApiTestingError
} = require('@jworkman-fs/asl/src/Exception/testing.js')
const { InvalidContactSchemaError } = require('@jworkman-fs/asl/src/Exception/index.js')
const { Curl } = require('node-libcurl')

const tests = {
  groups: [

    /*
     * 👉 Server & Resource are both reachable:
     *    - [✅] Server is reachable 
     *    - [✅] Resource is reachable 
     */
    [
      `🛜 - Is your server & resource reachable?`,
      [
        [
          `Server is reachable over port 8080`,
          async () => {
            try {
              await axios.get('http://localhost:8080/404')
            } catch(e) {
              if (
                `undefined` === typeof e.code
                || e.code.indexOf('ECONNREFUSED') >= 0) {
                throw new ServerUnreachableError(`Connection could not be established to your server running on port 8080. You may want to check your network, firewall, and other settings to try to resolve the issue.`)
              } else {
                expect(e.response.status).toBe(404)
              }
            }
          }
        ]
      ]
    ],


    /*
     * 👉 Resource is responding correctly:
     *    - [✅] Resource content type is set to JSON
     *    - [✅] JSON response is of type: array
     *    - [✅] At least one contact is received
     *    - [✅] Resource is using valid schema
     */
    [
      `🛢️ - Does your resource return proper JSON?`,
      [
        // Check the /v1/contacts endpoint exists
        [
          `/v1/contacts RESTful API resource does exist, and returns 2xx`,
          async () => {
            try {
              const response = await axios.get('http://localhost:8080/v1/contacts')
              // Check if the status code is in the range of 200-299
              expect(response.status).toBeGreaterThanOrEqual(200)
              expect(response.status).toBeLessThan(300)
            } catch (error) {
              throw new ResourceUnreachableError(`The resource at /v1/contacts could not be reached. Make sure your routes are defined properly.`)
            }
          }
        ],
        [
          `Contacts resource returns a valid JSON response`,
          async () => {
            try {
              const { headers } = await axios.get(`http://localhost:8080/v1/contacts`)
              const type = headers['content-type']||headers['Content-Type']||''
              expect(type.indexOf('application/json')).toBeGreaterThanOrEqual(0)
            } catch(error) {
              throw new InvalidContentTypeError(`It looks like your API contacts resource isn't properly setting the Content-Type header to "application/json". Make sure you are using res.json() method in your Express application to set the response type to JSON.`)
            }
          }
        ],
        [ 
          `GET /v1/contacts responds with type: Array[] / Contact[]`,
          async () => {
            try {
              const { data } = await axios.get(`http://localhost:8080/v1/contacts`)
              expect(typeof data.length).toBe('number')
            } catch(error) {
              throw new ApiTestingError(`The results that were returned were was not in the form of an Array`)
            }
          }
        ],
        [
          `GET /v1/contacts resource returns at least one contact`,
          async () => {
            try {
              const { data } = await axios.get(`http://localhost:8080/v1/contacts`)
              if (`undefined` === data.length || data.length < 1) {
                throw new NoContactsReturnedError('No contacts were returned in the proper format. Make sure when you hit your contacts resource that there is an array of contacts being returned with at least one object in it. Note that this is being done when no sorting, filtering, or pagination options are being set in the request. It should just use the defaults defined in the requirements for this activity.')
              }
            } catch(error) {
            }
          }
        ],
        [ 
          `Returned contacts all use the proper schema fields: (id, lname, fname, email, phone, birthday)`,
          async () => {
            try {
              const { data } = await axios.get(`http://localhost:8080/v1/contacts`)
              data.forEach((c) => validateContactData(c, true))
            } catch(error) {
              throw new InvalidContactSchemaError(`One or more contacts returned in your contacts API resource did not contain a valid contact schema containing all of the required fields (id, fname, lname, phone, email, birthday). Check all of your contacts being returned to make sure their feilds match the required schema defined in this activity.`)
            }
          }
        ], 
      ]
    ],

    /*
     * 👉 Pagination is working correctly:
     *
     *  - [✅] Pagination works with default parameters
     *  - [✅] Pagination works without default parameters
     */
    [
      `📇 - Was pagination properly implemented on your resource?`,
      [
        [
          `Pagination works with default parameters`,
          async () => {
            try {
              const { data } = await axios.get(`http://localhost:8080/v1/contacts`)
              if (`undefined` === typeof data || `undefined` === typeof data.length)
                throw new ApiTestingError(`No body data was returned from GET /v1/contacts, or another unexpected error happened when attempting to hit the resource path with default pagination parameters. Please check your API's pagination logic.`)
              
              // The default number of pagination results should be ten which is what we 
              // need to check for in our results.
              expect(data.length).toBe(10)
            } catch(error) {
              if (typeof error === "UndefinedDataInResponseError")
                throw error
              else 
                throw new PaginationResultCountError(`There seems to more, or less than exactly 10 contacts that were returned in your results when there are no pagination parameters defined. The paginator should default to 10 contacts at a time.`) 
            }
          }
        ],
        [
          `Pagination works without default parameters`,
          async () => {
            expect.assertions(2)

            const { data: dataOne } = await axios.get(`http://localhost:8080/v1/contacts?page=4&limit=5`)
            expect(dataOne.length).toBe(5)

            const { data: dataTwo } = await axios.get(`http://localhost:8080/v1/contacts?page=2&limit=7`)
            expect(dataTwo.length).toBe(7)

          }
        ]
      ]
    ],

    /*
     * 👉 Sorting is working correctly:
     *
     *  - [✅] Sorting works with default parameters
     *  - [✅] Sorting works without default parameters
     */
    [
      `🔤 - Was sorting properly implemented on your resource?`,
      [
        [
          `Sorting works with "lname" both ascending and decending (default and non default directions)`,
          async () => {
            expect.assertions(6)
            const { data: lnameAsc } = await axios.get('http://localhost:8080/v1/contacts?sort=lname&direction=asc')
            const { data: fnameAsc } = await axios.get('http://localhost:8080/v1/contacts?sort=fname&direction=asc')
            const { data: lnameDesc } = await axios.get('http://localhost:8080/v1/contacts?sort=lname&direction=desc')
            expect(lnameDesc[0].id).toBe(35)
            expect(lnameDesc[1].id).toBe(227)
            expect(lnameAsc[0].id).toBe(219)
            expect(lnameAsc[1].id).toBe(275)
            expect(fnameAsc[0].id).toBe(51)
            expect(fnameAsc[1].id).toBe(179)
          }
        ],
      ]
    ],

    /*
     * 👉 Filtering is working correctly:
     *
     *  - [✅] Filtering works with default parameters
     *  - [✅] Filtering works without default parameters
     */
    [
      `🔍 - Was filtering properly implemented on your resource?`,
      [
        [
          `Filtering works with default parameters`,
          async () => {
            const filters = [
              { op: 'gte', by: 'birthday', value: '1997-04-06', expect: { first: 67, last: 251 } },
              { op: 'gt', by: 'birthday', value: '1997-04-06', expect: { first: 251, last: 251 } },
              { op: 'eq', by: 'birthday', value: '1982-04-17', expect: { first: 243, last: 243 } },
              { op: 'lte', by: 'birthday', value: '1997-04-06', expect: { first: 3, last: 75 } },
              { op: 'lt', by: 'birthday', value: '1997-04-06', expect: { first: 3, last: 83 } }
            ]
            expect.assertions(filters.length * 2)
            for (let i = 0; i< filters.length; i++)
            {
              const { data } = await axios.get('http://localhost:8080/v1/contacts', {
                headers: {
                  'X-Filter-By': filters[i].by,
                  'X-Filter-Operator': filters[i].op,
                  'X-Filter-Value': filters[i].value
                }
              })
              expect(data[0].id).toBe(filters[i].expect.first)
              expect(data[data.length - 1].id).toBe(filters[i].expect.last)
            }
          }
        ]
      ]
    ],

    /*
     *  👉 All CRUD operations are working:
     *
     *  - [] Able to create a new contact 
     *  - [] Able to show a specific contact by its identifier
     *  - [] Able to update a specific contact by its identifier
     *  - [] Able to delete, or remove a contact by its identifier
     */
    [
      `💩 - Was CRUD properly implemented on your resource?`,
      [
        [
          `Able to create a new contact`,
          async () => {
            expect.assertions(2)
            const data = {
              fname: 'Justin',
              lname: 'Workman',
              birthday: '11-11-1982',
              phone: '207-555-5555',
              email: 'jworkman@fullsail.com'
            }
            const curl = new Curl()
            const url = 'http://localhost:8080/v1/contacts'
            curl.setOpt(Curl.option.URL, url)
            curl.setOpt(Curl.option.POSTFIELDS, JSON.stringify(data))
            curl.setOpt(Curl.option.HTTPHEADER, [
              'Content-Type: application/json'
            ])
            await new Promise((resolve, reject) => {
              curl.on('end', (statusCode, body, headers) => {
                let locationHeader = ""
                // Find the Location header from the response
                for(let i = 0; i < headers.length; i++) {
                  locationHeader = headers[i]['Location']||""
                }
                expect(statusCode).toBe(303)
                expect(locationHeader).toMatch(/^\/v1\/contacts\/\d+$/)
                curl.close()
                resolve()
              })
              curl.on('error', curl.close.bind(curl))
              curl.perform()
            })
          }
        ],
        [
          `Able to show a specific contact by its identifier`,
          async () => {
            const { data } = await axios.get('http://localhost:8080/v1/contacts/11')
            expect.assertions(2)
            expect(data.fname).toBe('Jennifer')
            expect(data.lname).toBe('Scott')
          }
        ],
        [
          `Able to update a specific contact by its identifier`,
          async () => {
            const data = {
              id: 324,
              fname: 'Shae',
              lname: 'Tyler',
              birthday: '11-11-1980',
              phone: '307-555-5555',
              email: 'jworkman2@fullsail.com'
            }
            try {
              const update = await axios.put('http://localhost:8080/v1/contacts/324', data)
            } catch(error) {
            }
            const { data: show } = await axios.get('http://localhost:8080/v1/contacts/324')
            expect.assertions(6)
            expect(show.id      ).toBe(324)
            expect(show.fname   ).toBe('Shae')
            expect(show.lname   ).toBe('Tyler')
            expect(show.phone   ).toBe('307-555-5555')
            expect(show.email   ).toBe('jworkman2@fullsail.com')
            expect(show.birthday).toBe('11-11-1980')
          }
        ],
        [
          `Able to delete, or remove a contact by its identifier`,
          async () => {
            try {
              await axios.delete('http://localhost:8080/v1/contacts/325')
              const show = await axios.get('http://localhost:8080/v1/contacts/325')
              expect(show.response.status).toBe(404)
            } catch(error) {}
          }
        ]
      ]
    ],
  ]
}

tests.groups.forEach((group) => {
  describe(group[0], () => {
    group[1].forEach((test) => {
      it(test[0], test[1])
    })
  })
})
