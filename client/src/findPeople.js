import { useState, useEffect } from "react";

export default function FindPeople() {
    const [people, setPeople] = useState();
    const [searchTerm, setSearchTerm] = useState();
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(`find?user=newest`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setPeople(data.users);
                } else {
                    setError(true);
                }
            })
            .catch(() => setError(true));
    }, []);

    useEffect(() => {
        let abort = false;
        if (searchTerm) {
            fetch(`/find?user=${searchTerm}`)
                .then((res) => res.json())
                .then((data) => {
                    if (!abort) {
                        if (data.success) {
                            setPeople(data.users);
                        } else {
                            setError(true);
                        }
                    }
                })
                .catch(() => {
                    setError(true);
                });
        } else {
            setPeople([]);
        }

        return () => {
            abort = true;
        };
    }, [searchTerm]);

    return (
        <>
            <h2>This is the FindPeople Component</h2>
            {error && <h2>Oops, something went wrong...</h2>}
            <input
                className="search-input"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {people &&
                people.map((person) => (
                    <div key={person.id}>
                        <img
                            src={person.image_url}
                            className="search-result-image"
                        />
                        {person.first} {person.last}
                    </div>
                ))}
        </>
    );
}
