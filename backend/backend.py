import asyncio
import websockets
from confluent_kafka import Producer
from config import config

key = "one"
producer = Producer(config)

def callback(err, event):
    if err:
        print(f'Produce to topic {event.topic()} failed for event: {event.key()}')
    else:
        val = event.value().decode('utf8')
        print(f'{val} sent to partition {event.partition()}.')

async def handle_websocket(websocket, path):
    # Check if the request is for a WebSocket upgrade
    if websocket.request_headers.get("Connection") == "Upgrade" and websocket.request_headers.get("Upgrade") == "websocket":
        await websocket.accept()  # Accept the WebSocket upgrade request
        print("WebSocket connection established.")
        
        try:
            async for message in websocket:
                print(f"Received message: {message}")
                # Here you can process the received message and perform any desired actions
                producer.produce('clicks', message.encode('utf-8'), key, on_delivery=callback)
                producer.flush()
        except websockets.exceptions.ConnectionClosed:
            print("WebSocket connection closed.")
    else:
        # Reject requests that are not WebSocket upgrade requests
        await websocket.close()

start_server = websockets.serve(handle_websocket, "0.0.0.0", 5000)

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    server = loop.run_until_complete(start_server)
    try:
        loop.run_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.close()
        loop.run_until_complete(server.wait_closed())
        loop.close()
