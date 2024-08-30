const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const bodyParser = require('body-parser');
const multer = require('multer');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }

        const users = JSON.parse(data);
        const user = users.find(user => user.user_name === username && user.password === password);

        if (user) {
            res.json({ success: true, user_id: user.user_id });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    });
});

app.get('/username/:userId', (req, res) => {
    const userId = req.params.userId;

    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }

        const users = JSON.parse(data);
        const user = users.find(user => user.user_id === userId);

        if (user) {
            res.json({ success: true, user_name: user.user_name });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    });
});

app.get('/userprpic/:userId', (req, res) => {
    const userId = req.params.userId;

    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }

        const users = JSON.parse(data);
        const user = users.find(user => user.user_id === userId);

        if (user) {
            res.json({ success: true, prpic: user.prpic });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    });
});

app.get('/posts', (req, res) => {
    const postsDirectory = path.join(__dirname, 'public', 'posts');
    fs.readdir(postsDirectory, (err, files) => {
        if (err) {
            console.error('Error reading posts directory:', err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }

        const posts = files.filter(file => file.endsWith('.json')).map(file => {
            const filePath = path.join(postsDirectory, file);
            try {
                const postContent = fs.readFileSync(filePath, 'utf-8');
                return JSON.parse(postContent);
            } catch (err) {
                console.error('Error reading or parsing file:', file, err);
                return null;
            }
        }).filter(post => post !== null);

        res.json({ success: true, posts });
    });
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/ppics/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/register', upload.single('profile_picture'), async (req, res) => {
    try {
        const { username, password } = req.body;
        const profilePicture = req.file ? `/ppics/${req.file.filename}` : '/ppics/default.png'; 

        const usersFilePath = path.join(__dirname, 'users.json');
        let users = [];

        
        if (fs.existsSync(usersFilePath)) {
            const usersData = await fs.readFile(usersFilePath, 'utf8');
            users = JSON.parse(usersData);
        }

        
        const existingUser = users.find(user => user.user_name === username);
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Username already exists' });
        }

        
        const userId = crypto.randomBytes(16).toString('hex');

        
        const newUser = {
            user_id: userId,
            user_name: username,
            password: password,
            prpic: profilePicture
        };

        
        users.push(newUser);

        
        await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf8');

        
        res.json({ success: true, user_id: userId });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});




const postStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dest = path.join(__dirname, 'public/uploads');
        fs.ensureDirSync(dest);
        cb(null, dest);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});


const upload2 = multer({ storage: postStorage });


app.post('/create-post', upload2.fields([{ name: 'images' }, { name: 'videos' }]), async (req, res) => {
    try {
        const { author, caption } = req.body;
        const images = req.files['images'] ? req.files['images'].map(file => `/uploads/${file.filename}`) : [];
        const videos = req.files['videos'] ? req.files['videos'].map(file => `/uploads/${file.filename}`) : [];
        
        const post = {
            author,
            caption,
            images,
            videos,
            timestamp: new Date().toISOString()
        };

        const postDir = path.join(__dirname, 'public/posts');
        await fs.ensureDir(postDir);
        const postFilePath = path.join(postDir, `post_${Date.now()+post.author}.json`);
        await fs.writeFile(postFilePath, JSON.stringify(post, null, 2));

        res.json({ success: true, message: 'Post created successfully' });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});