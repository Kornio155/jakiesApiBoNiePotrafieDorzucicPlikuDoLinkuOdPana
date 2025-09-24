import React from "react";

interface SzegolyProp {
    name: string;
    height: number;
    mass: number;
    gender: string;
    eye_color: string;
    setSelected: (a: any) => void;
}

const Szczegoly = ({name, height, mass, gender, eye_color, setSelected}: SzegolyProp) => {
    return(
            <div style={{ marginTop: "20px" }}>
                <h2>{name}</h2>
                <p>Wzrost: {height} cm</p>
                <p>Waga: {mass} kg</p>
                <p>Płeć: {gender}</p>
                <p>Kolor oczu: {eye_color}</p>
                <button onClick={() => setSelected(null)}>Ukryj szczegóły</button>
            </div>
    )
}

export default Szczegoly;