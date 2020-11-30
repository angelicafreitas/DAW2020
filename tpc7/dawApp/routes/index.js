var express = require('express');
var router = express.Router();

var Student = require('../controllers/student')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET students page. */
router.get('/students', function(req, res) {
  Student.list()
    .then(data =>   res.render('students', { 
      list: data 
    }))
    .catch(err => res.render('error', {error: err}))

});

/* GET register page. */
router.get("/students/register", function(req, res) {
  res.render('register')

})

/* GET student page. */
router.get("/students/:id", function(req, res) {
  var studentId = req.params.id
  Student.lookUp(studentId)
    .then(s => 
      res.render('student',{student: s}))
    .catch(err => res.render('error', {error: err}))
})

/* DELETE student*/
router.delete("/students/:id", function(req, res) {
  var studentId = req.params.id
  Student.delete(studentId)
    .then(s => {res.sendStatus(200)}) 
    .catch(err => res.render('error', {error: err}))
})

/* POST student. */
router.post("/students", function(req, res) {
  var student = req.body
  Student.insert(student)
  .then(s => {                                
    res.render('confirmReg')
  }) 
  .catch(err => res.render('error', {error: err}))
})


module.exports = router;
