const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  teacher: {type: String, required: true},
  imgSubject: {type: String, required: true},
  imgTeacher: {type: String, required: true}
});

const Subject = mongoose.model('subject', subjectSchema);

module.exports = Subject;
