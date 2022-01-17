import { useState } from "react";

export default function useForm() {
    const [userInput, setuserInput] = useState();

    const handleChange = (e) =>
        setuserInput({
            ...userInput,
            [e.target.name]: e.target.value,
        });

    return [userInput, handleChange];
}
