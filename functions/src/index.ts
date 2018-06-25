import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
const env = functions.config();

import * as algoliasearch from 'algoliasearch';

const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('food_search');

exports.indexFood = functions.firestore.document('food/{foodId}').onCreate((snap, context) => {
        const data = snap.data();
        const objectID = snap.id;

        return index.addObject({
            objectID,
            ...data
        });
});

exports.updateFood = functions.firestore.document('food/{foodId}').onUpdate((snap, context) => {
    const data = snap.after.data();
    const objectID = snap.after.id;

    return index.addObject({
        objectID,
        ...data
    });
});

exports.unindexFood = functions.firestore.document('food/{foodID}') .onDelete((snap, context) => {
        const objectID = snap.id;

        // Delete an ID from the index
        return index.deleteObject(objectID);
});
