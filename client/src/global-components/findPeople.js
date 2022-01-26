import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [people, setPeople] = useState();
    const [searchTerm, setSearchTerm] = useState();
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(`/api/find?user=newest`)
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
            fetch(`/api/find?user=${searchTerm}`)
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
            <div className="wrapper">
                <h2>Find your friends:</h2>
                {error && <h2>Oops, something went wrong...</h2>}
                <input
                    className="search-input"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="search-results-wrapper">
                {people &&
                    people.map((person) => (
                        <Link key={person.id} to={`/user/${person.id}`}>
                            <div className="search-result">
                                <div className="search-result-image">
                                    <img src={person.image_url} />
                                </div>
                                <div className="search-result-text">
                                    {person.first} {person.last}
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
        </>
    );
}
