/* eslint-disable linebreak-style */

const { getDb, getNextSequence } = require('./db.js');

async function productList() {
  const db = getDb();
  const productDB = await db.collection('module4collection').find({}).toArray();
  return productDB;
}

async function getProduct(_, { id }) {
  const db = getDb();
  const product = await db.collection('module4collection').findOne({ id });
  return product;
}

async function productAdd(_, { product }) {
  const db = getDb();
  const newProduct = product;
  newProduct.id = await getNextSequence('module4collection');
  const result = await db.collection('module4collection').insertOne(product);
  const savedProduct = await db.collection('module4collection').findOne({ _id: result.insertedId });
  return savedProduct;
}

async function productUpdate(_, { id, changes }) {
  const db = getDb();
  await db.collection('module4collection').updateOne({ id }, { $set: changes });
  const savedProduct = await db.collection('module4collection').findOne({ id });
  return savedProduct;
}

async function remove(_, { id }) {
  const db = getDb();
  const product = await db.collection('module4collection').findOne({ id });
  if (!product) return false;
  product.deleted = new Date();
  let result = await db.collection('deleted_products').insertOne(product);
  if (result.insertedId) {
    result = await db.collection('module4collection').removeOne({ id });
    return result.deletedCount === 1;
  }
  return false;
}

module.exports = {
  productList,
  productAdd,
  getProduct,
  productUpdate,
  remove,
};