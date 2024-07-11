const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const connectdb = require('./Config/connectdb');
const clientModel = require('./Model/Client');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer=require("multer");
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'ali@321';
connectdb();
const app = express();
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, '/folder/files');
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
      }
})
const upload = multer({ storage });

app.use(express.json());
app.use(cors({
    origin:["http://localhost:5174"],
    mathods:["GET","POST"],
    credentials : true
}
));
app.use(cookieParser());
//for server static file
app.use(express.static(path.join(__dirname, 'public')));
app.post('/signup', upload.single('file'), (req, res) => {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    res.json({ message: 'File uploaded successfully', file });
  });
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await clientModel.findOne({ email: email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json('Invalid email or password');
        }
        const payload={
            userId: user._id
        }
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        res.cookie("token", token);
        res.json({ token });
    } catch (err) {
        res.status(500).json('Error signing in');
    }
});
app.post('/signup', async(req, res) => {
    try {
        const { name, lastName, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new clientModel({ name, lastName, email, password: hashedPassword});
        await newUser.save();
        res.status(201).json('User created successfully');
    } catch (error) {
        res.status(500).json(`Error creating user: ${error.message}`);
    }
   
});

app.get('/user', (req, res) => {
    clientModel.find()
        .then(users => res.json(users))
        .catch(err => res.status(500).json(`Error fetching users: ${err.message}`));
});
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
