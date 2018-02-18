
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.locals.connection.query('SELECT * from PLAYER', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
};

exports.createPlayer = function(player) {
  res.send('new player with new profile'+player);
}