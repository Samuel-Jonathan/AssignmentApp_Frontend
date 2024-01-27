let Student = require('../model/student');

function getStudents(req, res) {
    Student.find({}, (err, students) => {
      if (err) {
        return res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des étudiants.' });
      }
      
      res.status(200).json(students);
    });
  }
  
  module.exports = {
    getStudents
  };