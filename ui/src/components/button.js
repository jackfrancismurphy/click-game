import React, { useState, useEffect, useRef } from "react";

function Button() {
  const [message, setMessage] = useState('');
  const wsRef = useRef(null);

  useEffect(() => {
    let ws = new WebSocket("ws://localhost:5000/echo");

    wsRef.current = ws


    ws.addEventListener('open', () => {
      console.log("WebSocket is open and ready to send messages.");
    });

    ws.addEventListener('message', ev => {
      setMessage('<<< ' + ev.data, 'blue');
    });

    return () => {
    //    wsRef.current.close();
    };
  }, []);

  const handleClick = () => {

    console.log(wsRef.current.readyState);

    if (wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send("click");
    } else {
      console.log("WebSocket is not open.");
    }
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

/** 
 * Things to discuss with Afzal:
 * When should I close the web socket within this program?
 * I have done all this work on backend, how would I split it up into different branches?
 * What's a good git workflow? (I start working and I forget about branches)
 * 
 * 
 * Where I am in the project right now: 
 * I now have a click which sends up to a topic on confluent cloud.
 * Next I need to have a transformation happen in the cloud and have the message brought back to the UI
 * I need to have another piece of information created by the UI 
 * and stored in the message to send up to the cloud before I do the transformation.
 * 
 * Once the transformation is done there will be a message which will come back and trigger a 'winner' event on the UI 
 * 
 * **/ 
