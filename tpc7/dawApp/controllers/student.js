//Student controller

var Student = require('../models/student')

//Returns list of students
module.exports.list = () =>{
    return Student
        .find()
        .sort({nome:1})
        .exec()
}

//Returns student with id
module.exports.lookUp = id => {
    return Student
        .findOne({numero: id})
        .exec()
}

//Inserts a new student
module.exports.insert = student => {
    var newStudent = new Student(student)
    return newStudent.save()
}

//Deletes student from id
module.exports.delete = id => {
    return Student.deleteOne({numero: id}).exec()
} 

//Updates student from id
module.exports.update = (id,data) => {
    return Student.updateOne({numero:id},data).exec()
}

 
