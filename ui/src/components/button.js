import React, { useState, useEffect } from "react";

function Button() {

    const [message, setMessage] = useState('');
    
    const handleClick = () => {
        setMessage('Click event')
    }

    useEffect(() => {
        console.log(message);
      }, [message]);

    return (
        <div className="button-container">
                    <button className="leave-button" onClick={handleClick}>Leave Meeting</button>
        </div>

    )
}

export default Button;