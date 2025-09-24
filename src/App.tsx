import React, { useEffect, useState } from "react";
import Szczegoly from "./Szczegoly.tsx";
import Filtry from "./Filtry.tsx";

export default function App() {
    const [characters, setCharacters] = useState<any[]>([]);//przechowuje liste postaci
    const [loading, setLoading] = useState(true);//sprawdza czy dane sie jescze pobieraja
    const [error, setError] = useState<string | null>(null);//sprawdza czy wystpail blad i przechowuje go
    const [searchText, setSearchText] = useState("");//wyszukiwanie postaci(to co wpisze uzytkownik)
    const [filter, setFilter] = useState("");//plec ktora zaznaczy uzytkownik
    const [selected, setSelected] = useState<any | null>(null);//wybrana postac


    //tu pobiera wszystkie postacie z swapi
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
            setError(err.message);//jesli blad to tu go przypisze
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchAll();
    }, []);




    if (loading) return <p>Ładowanie danych...</p>;
    if (error) return <p>Coś poszło nie tak, spróbuj ponownie ({error})</p>;

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
            <h1>Postacie Star Wars</h1>

            {/*filtry*/}
            <Filtry
                searchText={searchText}
                filter={filter}
                setSelected={setSelected}
                characters={characters}
                setSearchText={setSearchText}
                setFilter={setFilter}
                />
            {selected && (

                <Szczegoly
                name={selected.name}
                height={selected.height}
                mass={selected.mass}
                gender={selected.gender}
                eye_color={selected.eye_color}
                setSelected={setSelected}
                />
            )
            }

        </div>
    );
}
