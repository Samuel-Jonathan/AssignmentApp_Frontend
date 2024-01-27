const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  id: { type: Number, unique: true, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: {type: String, required: true},
  university: {type: String, required: true}
});

const Student = mongoose.model('student', studentSchema);

module.exports = Student;
