import { MongoClient, Db } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const mongoClient = process.env.MONGODB_URL
    ? new MongoClient(process.env.MONGODB_URL)
    : null

let db: Db

if (mongoClient) {
    mongoClient.connect().then(() => {
        db = mongoClient.db(process.env.MONGODB_DB)
        db.stats().then((stats) => {
            console.log('Conexão com o banco de dados MongoDB estabelecida com sucesso')
            console.log(stats)
        })
    }).catch((error) => {
        console.log('Erro ao conectar ao banco de dados MongoDB:', error)
    })
}
