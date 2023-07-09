const express = require('express');

const router = express.Router();

const { validateCardData, validateCardId } = require('../helpers/validations');

const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  unLikeCard,
} = require('../controllers/cards');

router.get('/', getAllCards);

router.post('/', validateCardData, createCard);

router.delete('/:cardId', validateCardId, deleteCard);

router.put('/:cardId/likes', validateCardId, likeCard);

router.delete('/:cardId/likes', validateCardId, unLikeCard);

module.exports = router;
