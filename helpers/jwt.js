var { expressjwt: jwt } = require("express-jwt");

function authJWT() {
	const secret = process.env.JWT_SECRET;
	return jwt({
		secret,
		algorithms: ["HS256"],
		requestProperty: 'user'
		
	}).unless({
		path: ["/api/users/register", `/api/users/login`],
	});
}

module.exports = authJWT();

