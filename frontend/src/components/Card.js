import React from 'react';
import { useContext } from 'react';
import placeholder from '../images/placeholder.jpg';
import { CurrentUserContext } from './../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onTrashIconClick }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser?._id;
  const isLiked = card.likes.some((i) => i === currentUser?._id);
  const cardLikeButtonClassName = `card__like ${
    isLiked && 'card__like_active'
  }`;

  const handleCardClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleTrashIconClick = () => {
    onTrashIconClick(card);
  };

  return (
    <li className='card'>
      <img
        className='card__image'
        src={`${card.link}`}
        alt={`${card.name}`}
        onError={(e) => {
          e.target.src = `${placeholder}`;
        }}
        onClick={handleCardClick}
      />
      {isOwn && (
        <button
          type='button'
          className='card__delete'
          aria-label='Удалить'
          onClick={handleTrashIconClick}
        ></button>
      )}

      <div className='card__info'>
        <h2 className='card__title text-fit'>{card.name}</h2>
        <div className='card__like-container'>
          <button
            type='button'
            className={cardLikeButtonClassName}
            aria-label='Нравится'
            onClick={handleLikeClick}
          ></button>
          <span className='card__like-count'>{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
