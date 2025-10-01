const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('./models/User');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// serve static files from the "uploads" directory
app.use('/uploads', express.static('uploads'));

// create a user
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const imagePath = req.file
            ? path.join('uploads', req.file.filename).replace(/\\/g, '/')
            : null;

        const newUser = await User.create({
            name,
            email,
            password,
            image: imagePath
        });

        res.status(201).json({
            ...newUser.toObject(),
            image: newUser.image ? `http://localhost:5000/${newUser.image}` : null
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || "create user failed" });
    }
};

// update a user
const updateUser = async (req, res) => {
    try {
        const updatedData = req.body;
        if (req.file) {
            updatedData.image = path.join('uploads', req.file.filename).replace(/\\/g, '/');
        }

        const user = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        res.json({
            ...user.toObject(),
            image: user.image ? `http://localhost:5000/${user.image}` : null
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || "failed to update user" });
    }
};

// delete a user 
const deleteUser = async (req, res) => {
    try {
        const users = await User.findByIdAndDelete(req.params.id);
        if (!users) {
            return res.status(404).json({ error: "user not found" });
        }
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "delete the user failed" });
    }
}

// file upload endpoint
const uploadSingle = async (req, res) => {
    try {
        res.json({ file: req.file, body: req.body })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

app.post('/users', upload.single('image'), createUser);
app.put('/users/:id', upload.single('image'), updateUser);
app.delete('/users/:id', deleteUser);
app.post('/upload', upload.single('image'), uploadSingle);

// connect to database
mongoose.connect('mongodb://localhost:27017/multer')
    .then(() => console.log('connected to database'))
    .catch((err) => console.log(err));

app.listen(5000, () => {
    console.log('server started on port 5000');

})