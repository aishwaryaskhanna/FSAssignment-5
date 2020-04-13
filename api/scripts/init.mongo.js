/* eslint linebreak-style: ["error", "windows"] */
/* global db print */
/* eslint no-restricted-globals: "off" */

db.module4collection.remove({});
db.del_prods.remove({});
const count = db.module4collection.count();
print('Total records inserted :', count);

db.counters.remove({ _id: 'module4collection' });
db.counters.insert({ _id: 'module4collection', current: count });

db.module4collection.createIndex({ id: 1 }, { unique: true });
db.module4collection.createIndex({ Name: 1 });
db.module4collection.createIndex({ Price: 1 });
db.module4collection.createIndex({ Image: 1 });


db.del_prods.createIndex({ id: 1 }, { unique: true });
