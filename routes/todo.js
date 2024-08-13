const express = require("express");
const ToDo = require("../models/todo-model");
const authJWT = require("../helpers/jwt");
const router = express.Router();
router.use(authJWT);

// post - api/todo
router.post("/", authJWT, async (req, res) => {
	let task = new ToDo({
		title: req.body.title,
		description: req.body.description,
		date: req.body.date,
		done: req.body.done,
		userId: req.user.userId,
	});
	await task.save();
	res.status(201).send(task);
});

// GET with the userID - api/todo/
router.get("/", authJWT, async (req, res) => {
	// console.log(`user: ${req.user.userId}`)
	let tasks = await ToDo.find({ userId: req.user.userId });
	// console.log(typeof (req.user.userId));
	res.send(tasks);
});

// DELETE - api/todo/:id
router.delete("/:id", authJWT, async (req, res) => {
	try {
		// console.log(`id: ${req.params.id}`);
		// console.log(`user: ${req.user.userId}`);
		// console.log(typeof req.params.id);
		// console.log(typeof req.user.userId);
		console.log(req.user);
		let task = await ToDo.findOneAndDelete({
			_id: req.params.id,
			userId: req.user.userId,
		});
				
		console.log(task);
		if (!task) {
			return res.status(404).send("Task not found");
		}
		res.send(task);
	} catch (error) {
		res.send(error);
	}
});

// PUT - api/todo/:id
router.put("/:id", authJWT, async (req, res) => {
	try {
		console.log(`${req.params.id}`);
		console.log(`${req.user.userId}`);
		console.log(typeof req.params.id);
		console.log(typeof req.user.userId);
		const task = await ToDo.findOneAndUpdate(
			{ _id: req.params.id, userId: req.user.userId },
			{
				title: req.body.title,
				description: req.body.description,
				date: req.body.date,
				done: req.body.done,
				userId: req.user.userId
			},
			{ new: true }
		);

		if (!task) {
			return res.status(404).send("Task cannot be updated");
		}
		res.send(task);
	} catch (error) {
		console.error(error);
	}
});

module.exports = router;

// //get - api/todo
// router.get("/", async (req, res) => {
// 	let tasks = await ToDo.find();
// 	res.send(tasks);
// });

// //delete - api/todo/:id
// router.delete("/:id", async (req, res) => {
// 	let task = await ToDo.findByIdAndDelete(req.params.id);
// 	if (!task) {
// 		return res.status(404).send("Task not found");
// 	}
// 	res.send(task);
// });

// // Put - api/todo/:id
// router.put("/:id", async (req, res) => {
// 	const task = await ToDo.findByIdAndUpdate(
// 		req.params.id,
// 		{
// 			title: req.body.title,
// 			description: req.body.description,
// 			date: req.body.date,
// 			done: req.body.done,
// 		},
// 		{ new: true }
// 	);

// 	if (!task) {
// 		return res.status(404).send("Task cannot be updated");
// 	}
// 	res.send(task);
// });
