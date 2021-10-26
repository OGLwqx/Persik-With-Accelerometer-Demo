import React from 'react';
import PropTypes from 'prop-types';

import { Panel, Div } from '@vkontakte/vkui';

import persik from '../img/persik.png';
import './Persik.css';

const Persik = props => (
	<Panel id={props.id}>
		<img className="Persik" src={persik} style={{
			position: 'absolute',
			left: props.mouse.x-100+'px',
			top: props.mouse.y-100+'px'
		}} alt="Persik The Cat"/>
		<Div className="Barrier" style={{
			position: 'absolute',
			left: props.barrier.x+'px',
			top: props.barrier.y+'px',
			width: props.barrier.width+'px',
			height: props.barrier.height+'px'
		}}></Div>
		<Div className="Barrier" style={{
			position: 'absolute',
			left: props.barrier2.x+'px',
			top: props.barrier2.y+'px',
			width: props.barrier2.width+'px',
			height: props.barrier2.height+'px'
		}}></Div>
		<Div>{JSON.stringify(props.mouse)}</Div>
	</Panel>
);

Persik.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Persik;
