import React from 'react';
import './Card.css';

const Card = ({ image, value, suit }) => {
	return <img className="Card" alt={`${value} of ${suit}`} src={image} style={{ height: 400 }} />;
};

export default Card;
