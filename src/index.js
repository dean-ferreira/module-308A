// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from './databases.js';

function getUserData(id) {
    const dbs = {
        db1: db1,
        db2: db2,
        db3: db3,
    };
    return new Promise((resolve, reject) => {
        central(id)
            .then((db) => {
                return Promise.all([dbs[db](id), vault(id)]);
            })
            .then(([dbData, vaultData]) => {
                resolve({ ...dbData, ...vaultData });
            })
            .catch((err) => {
                reject(err);
            });
    });
}
