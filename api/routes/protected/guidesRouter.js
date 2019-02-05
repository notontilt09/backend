const express = require('express');
const { updateUser, getUserById } = require('../../helpers/guideHelpers');

const router = express.Router();

router.get('/:guideId', async (req, res, next) => {
	const { guideId } = req.params;
	try {
		const guide = await getUserById(guideId);
		return guide
			? res.status(200).json(guide)
			: next({ status: 400, message: 'A guide with that id does not exist' });
	} catch (err) {
		next({ message: err }, res);
	}
});

router.put('/update/:guideId', async (req, res, next) => {
	const { guideId } = req.params;
	const info = req.body;
	try {
		const numUpdated = await updateUser(guideId, info);
		if (numUpdated === 0) {
			next({ status: 400, message: 'A guide with that ID does not exist' });
			// res.status(400).json({ error: 'A guide with that ID does not exist' });
		} else {
			res.status(200).json(numUpdated);
		}
	} catch (err) {
		// postgres errorhandler
		if (err['code'] === '42703') {
			next({ status: 400, message: 'Unrecognized key in update object' });
			// res.status(400).json({ error: 'Unrecognized key in update object' });
		} else {
			next({ message: err }, res);
		}
	}
});

module.exports = router;
