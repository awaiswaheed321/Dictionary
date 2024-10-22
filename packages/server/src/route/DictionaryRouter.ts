import { Router } from "express";
import DictionaryController from "../controller/DictionaryController";

const DictionaryRouter = Router();

/**
 * @swagger
 * /dictionary/top:
 *   get:
 *     summary: Get top searched words with their counts
 *     responses:
 *       200:
 *         description: Successfully retrieved top searches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Count'
 *       204:
 *         description: No content (Empty list)
 */
DictionaryRouter.route("/top").get(DictionaryController.getTopSearches);

/**
 * @swagger
 * /dictionary/{word}:
 *   get:
 *     summary: Search for a word definition
 *     parameters:
 *       - in: path
 *         name: word
 *         required: true
 *         schema:
 *           type: string
 *         description: The word to search for
 *     responses:
 *       200:
 *         description: Successfully retrieved the word definitions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Entry'
 *       404:
 *         description: Word not found
 */
DictionaryRouter.route("/:word").get(DictionaryController.searchWord);

export default DictionaryRouter;
