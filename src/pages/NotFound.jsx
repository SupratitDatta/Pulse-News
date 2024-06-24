import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/notfound.css';

const NotFound = () => {
    useEffect(() => {
        document.querySelector('.error_body').className = "error_body error_body_active";
    }, []);

    return (
        <div className="error_body">
            <div>
                <h1 className="error">ERROR : 404</h1>
            </div>
            <div className="cont_error">
                <h1>Oops</h1>
                <p>The Page you're looking for isn't here.</p>
                <Link to="/" className="home-button">Go to Home</Link>
            </div>
            <div className="cont_aura_1"></div>
            <div className="cont_aura_2"></div>
        </div>
    );
};

export default NotFound;