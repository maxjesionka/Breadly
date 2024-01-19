const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const secretKey = 'your-secret-key';

const validUsers = [
  { username: 'user1', password: 'password1', isAdmin: true },
  { username: 'user2', password: 'password2', isAdmin: false },
];

app.use(cors());
app.use(bodyParser.json());

// Handle preflight requests
app.options('/auth', cors());

app.post('/auth', (req, res) => {
  const { username, password } = req.body;

  const validUser = validUsers.find((user) => user.username === username && user.password === password);

  if (validUser) {
    const token = jwt.sign({ username, isAdmin: validUser.isAdmin }, secretKey, { expiresIn: '1h' });
    console.log(`User '${username}' successfully logged in`);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Example protected route
app.get('/protected', verifyToken, (req, res) => {
  // Check the decoded token to determine if the user is an admin
  if (req.decoded && req.decoded.isAdmin) {
    res.json({ message: 'Admin Access Granted' });
  } else {
    res.status(403).json({ error: 'Access Denied. Admins Only.' });
  }
});

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Failed to authenticate token' });
    }

    req.decoded = decoded;
    next();
  });
}

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
