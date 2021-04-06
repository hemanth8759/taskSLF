const express = require('express');
const cors = require('cors');
require('dotenv').config();
var mongoose = require('mongoose');
const JWT_secret_key = process.env.JWT_SECRET_KEY;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = module.exports = express();
const UserModel = require('./models/userModel.js');

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("connected to db");
});

db.on("error", (err) => {
  console.log(err);
  res.json({
    "status": "error",
    "message": "connection to database failed \n" +
    "please press Enter or click OK"
  });
});

// verifying token
var verifyToken = (req, res, next) => {
    if(!req.headers.authorization){
        return res.json({
            status: "error",
            message: "unauthorized request \n" +
            "please press Enter or click OK"
        })
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null'){
        return res.json({
            status: "error",
            message: "unauthorized request \n" +
            "please press Enter or click OK"
        })
    }
    try {
        let payload = jwt.verify(token, JWT_secret_key)
        if(!payload){
            return res.json({
                status: "error",
                message: "unauthorized request \n"+
                "please press Enter or click OK"
            })
        }
        req.email = payload.email;
        next()
    } catch (err) {
        res.json({
            status: "error",
            message: "unauthorized token creation \n"+
            "please press Enter or click OK"
        })
    }
}

// validating login credentials
app.post('/loginNd', async (req, res) => {
  var loginReq = req.body;
  var email = loginReq.email;
  var user = await UserModel.findOne({
    email
  });
  if (user == null) {
    return res.json({
      "status": "error",
      "message": "user doesn't exist \n"+
      "please press Enter or click OK"
    })
  }
  try {
    if (await bcrypt.compare(req.body.password, user.hashedPassword)) {
        const token = jwt.sign({
            email: user.email
        } , JWT_secret_key)
      res.json({
        "status": "success",
        "token": token,
        "message": "access granted"
      })
    } else {
      res.json({
        "status": "error",
        "message": "incorrect password \n"+
        "please press Enter or click OK"
      })
    }
  } catch (err) {
    console.log(err);
    res.json({
      "status": "error",
      "message": err.message + " \n" +
      "please press Enter or click OK"
    })
  }
})

// registering user data in database
app.post('/registerNd', async (req, res) => {
  var reqData = req.body;
  reqData.hashedPassword = bcrypt.hashSync(reqData.password, 10);
  delete reqData.password;
  try {
    const user = new UserModel(reqData);
    await user.save();
    res.json({
      "status": "success",
      "message": "user successfully registered"
    });
} catch (err) {
    console.log(err);
    res.json({
        "status": "error",
        "message": String(err.message).split(": ")[2] + " \n" +
        "please press Enter or click OK"
    });
}
})

// dashboard access
app.get('/dashboardNd', verifyToken, async (req,res) => {
    res.json({
        "status": "success",
        "message": "welcome to dashboard"
    })
})
