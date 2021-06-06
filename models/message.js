const conn = require('./connection');

const saveMessage = async (message) => conn()
  .then((db) => db.collection('messages').insertOne({ ...message, timestamp: new Date() }));

const getAllMessages = async () => conn()
  .then((db) => db.collection('messages').find().toArray());

module.exports = {
  saveMessage,
  getAllMessages,
};