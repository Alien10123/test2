import { Client, Databases, ID, Query } from 'appwrite'
import { faker } from '@faker-js/faker'

const client = new Client()

client
    .setEndpoint('https://170.64.252.199/v1')
    .setProject('645360df129a72b7669a');

const databases = new Databases(client)

setInterval(() => {
    let promises = Array.from(Array(20), () => {
        return databases.createDocument('testing', 'idk', ID.unique(), {
            text: faker.random.words(10),
            userid: faker.datatype.string(),
        })
    })
    Promise.all(promises)

    let promisesRead = Array.from(Array(20), () => {
        return databases.listDocuments('testing', 'idk', [
            Query.orderDesc('userid'),
            Query.search('text', 'hi'),
            Query.limit(3),
        ])
    })
    Promise.all(promisesRead)
}, 250)
