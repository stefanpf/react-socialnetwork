import { useEffect } from "react";
import { useParams } from "react-router";

export default function OtherProfile() {
    const { id } = useParams();

    useEffect(() => {
        console.log("retrieve data for user:", id);
    }, [id]);
    return (
        <>
            <h2>This is the Other Profile component</h2>
            <div>Information about the other user goes here</div>
        </>
    );
}
