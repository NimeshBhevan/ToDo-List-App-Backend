var { expressjwt: jwt } = require("express-jwt");

// this function helps in deconstructing the jwt token for authenticating the user 
function authJWT() {
	const secret = process.env.JWT_SECRET;
	return jwt({
		secret,
		algorithms: ["HS256"],
		requestProperty: 'user'
		
	})
		// .unless() method is used to exclude certain paths from authentication
		.unless({
		path: ["/api/users/register", `/api/users/login`],
	});
}

module.exports = authJWT();

