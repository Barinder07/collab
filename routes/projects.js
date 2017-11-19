var express      = require('express');
var router       = express.Router();

var Project = require('../schema/project');

router.get('/id/:id', function(req, res, next) {
  res.send('Project id:' + req.params.id);
});


router.post('/add', function(req, res, next) {

	var user_id = req.decoded._id;

   	var project = new Project({
			title: req.body.title,
			description: req.body.description,
			manager: user_id,
    });

	project.save(function(err) {
		if(err) {
			console.log("project save error: " + err);
			res.send(err);
			return;
		}
		console.log("project created");
	});

  res.json({ success: true, message: 'Project created !', project: project});
});

//-----------------------------------------------------
//   Get Projects
//-----------------------------------------------------
router.get('/all', function(req, res) {

	var user_id = req.decoded._id;
	console.log("get all project for user: " + user_id);

	Project.find( {manager: user_id}, function(err, projects) {

		if(err) {
			res.send(err);
			return;
		}
		res.json(projects);
	});
});


module.exports = router;