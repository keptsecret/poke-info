import React, { useEffect, useState } from 'react';
import './Card.css';

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function Card(props) {
    const [name, setName] = useState('');
    useEffect(() => {
        setName(props.data['name']);
    }, [props.data]);

    const [sprites, setSprites] = useState({});
    useEffect(() => {
        setSprites(props.data['sprites']);
    }, [props.data]);

    const [types, setTypes] = useState([]);
    useEffect(() => {
        setTypes(props.data['types']);
    }, [props.data]);

    const [moves, setMoves] = useState([]);
    useEffect(() => {
        setMoves(props.data['moves']);
    }, [props.data]);

    if (name === '' || !sprites || types === [] || moves === []) {
        return null;
    }

    return (
        props ?
        <div className="Card">
            <button className="closeButton"><strong>&#10006;</strong></button>
            <h2>
                {props.data.id}: {capitalize(name)}
            </h2>
            <img src={sprites.front_default} alt={name} />
            <p><span>
                <b>Type(s):</b> {types.slice(0, 5).map((type, i) => (
                    <span key={i}>{type.type.name}, </span>
                ))}
            </span></p>
            <p><span>
                <b>Move(s):</b> {moves.slice(0, 10).map((move, i) => (
                    <span key={i}>{move.move.name}, </span>
                ))}
            </span></p>
        </div> :
        <h3>Loading...</h3>
    );
}

export default Card;
