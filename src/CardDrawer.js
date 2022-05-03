import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Card from './Card';
import { cleanup } from '@testing-library/react';

const CardDrawer = () => {
	const [ deck, setDeck ] = useState(null);
	const [ card, setCard ] = useState({
		image: '',
		value: '',
		suit: '',
		code: ''
	});
	const [ isEmpty, setIsEmpty ] = useState(false);
	const [ auto, setAuto ] = useState(false);
	const timer = useRef(null);

	useEffect(
		() => {
			async function getDeck() {
				let response = await axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
				setDeck(response.data);
			}
			getDeck();
		},
		[ setDeck ]
	);

	async function drawCard() {
		try {
			if (isEmpty) {
				throw new Error('No cards remaining!');
			}
			let res = await axios.get(`http://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/`);

			if (res.data.remaining === 0) {
				setIsEmpty(true);
			}
			let drawnCard = res.data.cards[0];
			setCard({
				image: drawnCard.image,
				code: drawnCard.code,
				value: drawnCard.value,
				suit: drawnCard.suit
			});
		} catch (e) {
			alert(e);
		}
	}

	useEffect(
		() => {
			if (auto) {
				timer.current = setInterval(async () => {
					await drawCard();
				}, 1000);
			}
			function cleanUp() {
				clearInterval(timer.current);
				timer.current = null;
			}
			return () => cleanUp();
		},
		[ auto, setAuto, deck ]
	);

	return (
		<div>
			<button onClick={() => drawCard()}>Draw One</button>
			<button onClick={() => setAuto(!auto)}>{!auto ? '' : 'STOP'} AUTO DRAW</button>
			<br />
			{card.image ? <Card key={card.code} image={card.image} value={card.value} suit={card.suit} /> : null}
		</div>
	);
};

export default CardDrawer;
