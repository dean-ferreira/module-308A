// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from './databases.js';

// First Method - Promises
function getUserDataWithPromise(id) {
    const dbs = {
        db1: db1,
        db2: db2,
        db3: db3,
    };
    let getdb = Promise.resolve(central(id));
    let resultObj = {};
    getdb
        .then((data) => {
            console.log(data);
            let db = Promise.resolve(dbs[data](id));
            db.then((dbdata) => {
                // console.log(dbdata);
                resultObj.id = id;
                resultObj.username = dbdata.username;
                resultObj.website = dbdata.website;
                resultObj.company = dbdata.company;
                console.log('Result: ', resultObj);
            }).catch((err) => {
                console.log('Error: ', err);
            });
        })
        .catch((err) => {
            console.log('Error: ', err);
        });
    let vaultData = Promise.resolve(vault(id));
    vaultData.then((vdata) => {
        // console.log("Vault Data:", vdata);
        resultObj.name = vdata.name;
        resultObj.email = vdata.email;
        resultObj.address = vdata.address;
        resultObj.phone = vdata.phone;
        console.log('Result: ', resultObj);
    });
}
// getUserDataWithPromise(5);

// Second method - async/await
async function getUserDataWithAsync(id) {
    const dbs = {
        db1: db1,
        db2: db2,
        db3: db3,
    };
    let getdb = await central(id);
    let resultObj = {};
    console.log('Get db: ', getdb);
    let db = await dbs[getdb](id);
    let vaultData = await vault(id);
    // console.log("DB: ", db);
    // console.log("Vault: ", vaultData);
    resultObj.id = id;
    resultObj.username = db.username;
    resultObj.website = db.website;
    resultObj.company = db.company;
    resultObj.name = vaultData.name;
    resultObj.email = vaultData.email;
    resultObj.address = vaultData.address;
    resultObj.phone = vaultData.phone;
    console.log('Result obj:', resultObj);
}
getUserDataWithAsync(3);
