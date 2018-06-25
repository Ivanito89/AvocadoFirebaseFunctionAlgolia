"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const env = functions.config();
const algoliasearch = require("algoliasearch");
const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('food_search');
exports.indexFood = functions.firestore.document('food/{foodId}').onCreate((snap, context) => {
    const data = snap.data();
    const objectID = snap.id;
    return index.addObject(Object.assign({ objectID }, data));
});
exports.updateFood = functions.firestore.document('food/{foodId}').onUpdate((snap, context) => {
    const data = snap.after.data();
    const objectID = snap.after.id;
    return index.addObject(Object.assign({ objectID }, data));
});
exports.unindexFood = functions.firestore.document('food/{foodID}').onDelete((snap, context) => {
    const objectID = snap.id;
    // Delete an ID from the index
    return index.deleteObject(objectID);
});
//# sourceMappingURL=index.js.map