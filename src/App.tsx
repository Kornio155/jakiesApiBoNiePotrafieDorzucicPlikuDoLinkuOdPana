import React, { useEffect, useState } from "react";

export default function App() {
    const [characters, setCharacters] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchText, setSearchText] = useState("");
    const [filter, setFilter] = useState("");
    const [selected, setSelected] = useState<any | null>(null);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                let all: any[] = [];
                let url: string | null = "https://swapi.dev/api/people/";

                //petla odpowiedzialna za wyciaganie calosci a nie jednej strony
                while (url) {
                    const res = await fetch(url);
                    if (!res.ok) throw new Error("Błąd serwera: " + res.status);
                    const data = await res.json();
                    all = [...all, ...data.results];
                    url = data.next;
                }

                setCharacters(all);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, []);

    //filtrowanie
    const filtered = characters.filter(
        (c) =>
            c.name.toLowerCase().includes(searchText.toLowerCase()) &&
            (filter ? c.gender === filter : true)
    );


    if (loading) return <p>Ładowanie danych...</p>;
    if (error) return <p>Coś poszło nie tak, spróbuj ponownie ({error})</p>;
    if (!filtered.length) return <p>Brak wyników do wyświetlenia</p>;

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
            <h1>Postacie Star Wars</h1>

            {/*lista i filtry*/}
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

            {selected && (
                <div style={{ marginTop: "20px" }}>
                    <h2>{selected.name}</h2>
                    <p>Wzrost: {selected.height} cm</p>
                    <p>Waga: {selected.mass} kg</p>
                    <p>Płeć: {selected.gender}</p>
                    <p>Kolor oczu: {selected.eye_color}</p>
                    <button onClick={() => setSelected(null)}>Ukryj szczegóły</button>
                </div>
            )}
        </div>
    );
}
