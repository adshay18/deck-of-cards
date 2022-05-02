import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Card from './Card';

const CardDrawer = () => {
	const [ deckId, setDeckId ] = useState();
	const [ card, setCard ] = useState({
		image: '',
		value: '',
		suit: '',
		code: ''
	});
	const [ deck, setDeck ] = useState([]);

	useEffect(() => {
		async function getDeck() {
			const response = await axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');

			console.log(response);
		}

		getDeck();
	}, []);

	return (
		<div>
			<button onClick={() => console.log(deckId)}>Draw One</button>
			{card.image ? <Card /> : null}
		</div>
	);
};

export default CardDrawer;
