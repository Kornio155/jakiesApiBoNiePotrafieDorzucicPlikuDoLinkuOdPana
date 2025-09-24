import React from "react";

interface a {
    searchText: string;
    filter: string;
    setSelected: any;
    characters: any[];
    setSearchText: any;
    setFilter: any;
}

const Filtry = ({searchText, filter, setSelected, characters, setSearchText, setFilter}:a) => {
    const filtered = characters.filter(
        (c) =>
            c.name.toLowerCase().includes(searchText.toLowerCase()) &&
            (filter ? c.gender === filter : true)
    );
    return(
        <>
            <input
                type="text"
                placeholder="Szukaj..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ marginRight: "10px" }}
            />

            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="">Wszyscy</option>
                <option value="male">Mężczyźni</option>
                <option value="female">Kobiety</option>
                <option value="n/a">Roboty / brak</option>
            </select>

            {/*przefiltrowana lista postaci*/}
            <ul>
                {filtered.map((c) => (
                    <li key={c.name} onClick={() => setSelected(c)} style={{ cursor: "pointer" }}>
                        {c.name} – {c.gender}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Filtry;