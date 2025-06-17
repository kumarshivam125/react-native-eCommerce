const axios = require('axios');
const express = require('express');
const app = express();
const PORT = 4000;
const https = require('https');

const jwt = require('jsonwebtoken');
app.use(express.json());

const agent = new https.Agent({
    rejectUnauthorized: false
});
let arr = [];
async function getProducts() {
    try {
        const response = await axios.get('https://fakestoreapi.com/products', { httpsAgent: agent });
        arr = response.data.map(x => ({ ...x, qty: 0 }));
    } catch (error) {
        console.error('Error fetching products:', error.message);
    }
}

const admin = require('firebase-admin');
const serviceAccount = require('./firebase-key.json'); // path to your downloaded key
const { auth } = require('./middleware/auth');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

// app.get('/getToken', async (req, resp) => {
//     let x;
//     const data = jwt.sign({ name: "shivam", age: 22, }, "HELLO", { expiresIn: '1d' });
//     console.log("JWT -", data);
//     try {
//         const payload = jwt.verify(data, "HELLO");
//         console.log("DECODED--", payload);
//     }
//     catch (err) {
//         console.log("Error in Token", err)
//     }
//     return resp.json({ token: data })
// })


app.post('/signup', async (req, resp) => {
    // console.log("API CALLED-",req.body);
    let user;
    const { name, email, password } = req.body;
    async function demo() {
        try {
            const querySnapshot = await db.collection('hello111').get();
            for (const doc of querySnapshot.docs) {
                if (doc.data().email === email) return true;
            }
        }
        catch (error) {
            console.error('Error getting documents:', error);
        }
        return false;
    }
    const result = await demo();
    if (result == true) {
        return resp.json({
            success: false,
            message: "Email Already Exist"
        })
    }
    let x;
    db.collection('hello111').add({ name, email, password, cart: [] })
        .then(docRef => {
            console.log('Document written with ID:', docRef.id)
        })
        .catch(error => console.error('Error adding document:', error));

    return resp.json({
        success: true,
        message: "Account Created Successfully",
        token: 'helllwo',
        user: { name, email, password, cart: [] }
    })
})

app.get('/getData', async (req, resp) => {
    await getProducts();
    return resp.status(200).json(arr)
})

app.post('/login', async (req, resp) => {
    const { email, password } = req.body;
    let flg1 = 0, flg2 = 0;
    let user;
    async function demo() {
        try {
            const querySnapshot = await db.collection('hello111').get();
            for (const doc of querySnapshot.docs) {
                if (doc.data().email === email) {
                    flg1 = 1;
                    if (doc.data().password == password) flg2 = 1;
                    user = doc.data();
                }
                // console.log(doc.id, '=>', doc.data());
            }
        }
        catch (error) {
            console.error('Error getting documents:', error);
        }
    }
    const result = await demo();
    if (flg1 == 0) {
        return resp.json({
            success: false,
            message: "You are Not Registered With Us"
        })
    }
    if (flg2 == 0) {
        return resp.json({
            success: false,
            message: "Password is Wrong"
        })
    }
    const data = jwt.sign(user, "HELLO", { expiresIn: '1d' });
    return resp.json({
        success: true,
        message: "Logged In Successfully",
        user,
        token:data
    })
})

app.post('/updateCart',auth,async (req, resp) => {
    const email=req.user.email;
    const { data } = req.body;
    const obj = data.map(x => JSON.stringify(x));
    async function demo() {
        try {
            const querySnapshot = await db.collection('hello111').get();
            for (const doc of querySnapshot.docs) {
                if (doc.data().email === email) {
                    await doc.ref.update({ cart: obj });
                    break;
                }
            }
        }
        catch (error) {
            console.error('Error getting documents:', error);
        }
    }
    await demo();
    return resp.json({
        succes: true,
        msg: "Cart Updated"
    })
})


app.listen(PORT, () => console.log("APP started ", PORT))

// what is progaurd ? and how to USE/apply progaurd -
// How decompile works?
