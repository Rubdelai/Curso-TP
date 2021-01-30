import MongoClient from 'mongodb';

export async function connect() {
    try {
    const client = await MongoClient.connect('mongodb://localhost:27017',
    { useUnifiedTopology: true },
    {useNewUrlParser: true})
    console.log('previo a coneccion en database');
    const db = client.db('tasks');
    console.log('DB Tasks is connected');
    return db;
    } catch(e) {
        console.log(e);
    }
}
