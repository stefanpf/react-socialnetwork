import { useState } from "react";

export default function useFormSubmit(url, userInput) {
    const [error, setError] = useState(false);

    const submit = function (e) {
        e.preventDefault();
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInput),
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.success) {
                    location.replace("/");
                } else {
                    setError(true);
                }
            })
            .catch((err) => {
                console.log(`Error on POST to ${url}:`, err);
                setError(true);
            });
    };

    return [submit, error];
}
