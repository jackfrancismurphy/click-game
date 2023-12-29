import React, { useEffect, useRef } from 'react';

function MyComponent() {
  // Create a useRef to store the 'ws' variable
  const wsRef = useRef(null);

  useEffect(() => {
    // Create a WebSocket connection when the component mounts
    const newWebSocket = new WebSocket('your-websocket-url');

    // Store the WebSocket instance in the useRef
    wsRef.current = newWebSocket;

    // Add event listeners or perform other WebSocket setup here
    newWebSocket.addEventListener('open', () => {
      console.log('WebSocket connection opened');
    });

    newWebSocket.addEventListener('message', (event) => {
      console.log('Received message:', event.data);
    });

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      // Close the WebSocket connection and remove event listeners
      wsRef.current.close();
    };
  }, []); // Empty dependency array means this effect runs only on mount and unmount

  // You can use wsRef.current to access the WebSocket instance anywhere in your component

  return (
    <div>
      {/* Your component content */}
    </div>
  );
}

export default MyComponent;
