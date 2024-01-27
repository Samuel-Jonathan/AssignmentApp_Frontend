let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let assignment = require('./routes/assignments');
let subject = require('./routes/subjects')
let user = require('./routes/users');
let student = require('./routes/students');

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('debug', true);

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
const uri = 'mongodb+srv://jonathansamuel:POzCBcLY3onLUMFR@cluster0.lwuoywu.mongodb.net/assignments?retryWrites=true&w=majority';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log("vérifiez with http://localhost:8010/api/assignments que cela fonctionne")
  },
    err => {
      console.log('Erreur de connexion: ', err);
    });

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true"); // Ajoutez cette ligne
  if ('OPTIONS' === req.method) {
    res.send(200);
  }
  else {
    next();
  }
});

app.options('*', (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.send();
});


// Pour les formulaires
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

// les routes
const prefix = '/api';

// Configurer l'authentification
const User = require('./model/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// Inscription
app.post('/api/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      role: req.body.role
    });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Connexion
app.post('/api/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(404).send('User not found');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(401).send('Invalid password');

  const token = jwt.sign({ userId: user._id }, 'test', { expiresIn: '1h' });
  res.status(200).json({ token, user });
});

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send('Token not provided');
  }

  jwt.verify(token.split(' ')[1], 'test', (err, decodedToken) => {
    if (err) {
      return res.status(403).send('Invalid token');
    }
    req.user = decodedToken;
    next();
  });
}

app.route(prefix + '/assignments/all')
  .get(assignment.getAllAssignments)

// Routes pour /api/assignments avec authentification
app.route(prefix + '/assignments')
  .get(assignment.getAssignments)
  .post(authenticateToken, assignment.postAssignment)
  .put(authenticateToken, assignment.updateAssignment);

// Routes pour /api/assignments/:id avec authentification
app.route(prefix + '/assignments/:id')
  .get(assignment.getAssignment)
  .delete(authenticateToken, assignment.deleteAssignment);

app.route(prefix + '/users/:username')
  .get(user.getUser);

app.route(prefix + '/subjects')
  .get(subject.getSubjects);

app.route(prefix + '/students')
  .get(student.getStudents);



// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;



