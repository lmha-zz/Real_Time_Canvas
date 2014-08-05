module.exports = function Route(app) {
	var drawings = {};
	var temp;
	var drawing = [];
	var counter = 0;

	app.get('/', function(req, res) {
		res.render('client')
	})

	app.io.route('connection', function(req) {
		req.io.emit('old_drawings', drawings);
	})

	app.io.route('drawClick', function(req) {
		drawing.push(req.data);
		req.io.broadcast('draw', req.data);
		if(req.data.type == 'dragend') {
			drawings[counter] = drawing;
			drawing = [];
			counter++;
		}
	})

	app.io.route('erase_whitebaord', function(req) {
		temp = drawings;
		drawings = {};
		counter = 0;
		app.io.broadcast('new_whiteboard');
	})

	app.io.route('undo_reset', function(req) {
		app.io.broadcast('old_drawings', temp);
		temp = false;
	})
}