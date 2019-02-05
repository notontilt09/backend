module.exports = function(err, req, res, next) {
	res.status(err.status || 500).send({
		success: false,
		message: err.message
	});
};
