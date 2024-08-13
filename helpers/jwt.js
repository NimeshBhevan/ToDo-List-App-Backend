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


// var { expressjwt: jwt } = require("express-jwt");

// function authJWT() {
// 	const secret = process.env.JWT_SECRET;
// 	return jwt({
// 		secret,
// 		algorithms: ["HS256"],
// 		getToken: (req) => {
// 			if (
// 				req.headers.authorization &&
// 				req.headers.authorization.split(" ")[0] === "Bearer"
// 			) {
// 				return req.headers.authorization.split(" ")[1];
// 			}
// 			return null;
// 		},
// 	}).unless({
// 		path: ["/api/users/register", "/api/users/login"],
// 	});
// }

// Error handling middleware
// function errorHandler(err, req, res, next) {
// 	if (err.name === "UnauthorizedError") {
// 		return res.status(401).send({ message: "Invalid Token" });
// 	}
// 	next(err);
// }

// module.exports = { authJWT, errorHandler };
