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

    if (name === '' || !sprites || types === []) {
        return null;
    }

    return (
        props ?
        <div className="Card">
            <h2>{props.data.id}: {capitalize(name)}</h2>
            <img src={sprites.front_default} alt={name} />
            <p><span>
                Type(s): {types.map((type, i) => (
                    <span key={i}>{type.type.name} </span>
                ))}
            </span></p>
        </div> :
        <h3>Loading...</h3>
    );
}

export default Card;
