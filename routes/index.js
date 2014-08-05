module.exports = function Route(app) {
	app.io.route('drawClick', function(req) {
		req.io.broadcast('draw', req.data);
	})
	app.get('/', function(req, res) {
		res.render('client')
	})
}