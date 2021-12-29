//React
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div style={{ textAlign: "center", marginTop: "1rem" }} >
            <img src="images/not-found-dog.jpg" alt="not found page" width={400} />
            <h1 style={{ textAlign: "center" }}>404 - Page Not Found</h1>
            <p style={{ textAlign: "center" }}>
                <Link to="/home">Go to Home </Link>
            </p>
        </div>
    )
}
