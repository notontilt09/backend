const express = require('express');
const {
	user: { updateUser }
} = require('../../helpers');

const router = express.Router();

router.put('/update/:id', async (req, res) => {
	const { id } = req.params;
	const info = req.body;
	try {
		const numUpdated = await updateUser(id, info);
		if (numUpdated === 0) {
			res.status(400).json({ error: 'A user with that ID does not exist' });
		} else {
			res.status(200).json(numUpdated);
		}
	} catch (err) {
		//shouldn't ever reach this error unless server is unreachable
		res.status(500).json(err);
	}
});

module.exports = router;
