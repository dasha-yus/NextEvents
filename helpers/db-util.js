import { MongoClient } from "mongodb";

export async function connectDB() {
  const client = await MongoClient.connect(
    "mongodb+srv://dasha-yus:NIAk6yOx5u2f6K0I@cluster0.rhzqg.mongodb.net/events?retryWrites=true&w=majority"
  );
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, collection, sort, id = '') {
    const db = client.db();
    const documents = await db
      .collection(collection)
      .find({ eventId: id })
      .sort(sort)
      .toArray();
    return documents; 
}