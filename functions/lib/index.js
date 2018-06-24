"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const env = functions.config();
const algoliasearch = require("algoliasearch");
const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('food_search');
exports.indexFood = functions.firestore
    .document('food/{foodId}')
    .onCreate((snap, context) => {
    const data = snap.data();
    const objectId = snap.id;
    return index.addObject(Object.assign({ objectId }, data));
});
exports.unindexFood = functions.firestore
    .document('food/{foodID}')
    .onDelete((snap, context) => {
    const objectId = snap.id;
    // Delete an ID from the index
    return index.deleteObject(objectId);
});
//# sourceMappingURL=index.js.map