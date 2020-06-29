import express from 'express';
import asyncHandler from 'express-async-handler';
import sanitizeQuery from '../middleware/sanitize-query';
import validateQuery from '../middleware/validate-query';
import * as CollectionPresetsService from '../services/collection-presets';
import useCollection from '../middleware/use-collection';

const router = express.Router();

router.post(
	'/',
	useCollection('directus_collection_presets'),
	asyncHandler(async (req, res) => {
		const records = await CollectionPresetsService.createCollectionPreset(
			req.body,
			res.locals.query
		);
		return res.json({ data: records });
	})
);

router.get(
	'/',
	useCollection('directus_collection_presets'),
	sanitizeQuery,
	validateQuery,
	asyncHandler(async (req, res) => {
		const records = await CollectionPresetsService.readCollectionPresets(res.locals.query);
		return res.json({ data: records });
	})
);

router.get(
	'/:pk',
	useCollection('directus_collection_presets'),
	sanitizeQuery,
	validateQuery,
	asyncHandler(async (req, res) => {
		const record = await CollectionPresetsService.readCollectionPreset(
			req.params.pk,
			res.locals.query
		);
		return res.json({ data: record });
	})
);

router.patch(
	'/:pk',
	useCollection('directus_collection_presets'),
	asyncHandler(async (req, res) => {
		const records = await CollectionPresetsService.updateCollectionPreset(
			req.params.pk,
			req.body,
			res.locals.query
		);
		return res.json({ data: records });
	})
);

router.delete(
	'/:pk',
	useCollection('directus_collection_presets'),
	asyncHandler(async (req, res) => {
		await CollectionPresetsService.deleteCollectionPreset(req.params.pk);
		return res.status(200).end();
	})
);

export default router;
