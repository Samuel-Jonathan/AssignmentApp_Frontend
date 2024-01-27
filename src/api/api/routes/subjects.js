let Subject = require('../model/subject');

function getSubjects(req, res) {
  Subject.find({}, (err, subjects) => {
    if (err) {
      console.error('Erreur lors de la récupération des sujets :', err);
      return res.status(500).json({ error: 'Erreur lors de la récupération des sujets' });
    }
    res.json(subjects);
  });
}

module.exports = {
  getSubjects
};