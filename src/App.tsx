import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import WaitingRoom from "./components/waitingRoom";
import { useCallback, useState } from "react";
import {
  HubConnectionBuilder,
  LogLevel,
  HubConnection,
} from "@microsoft/signalr";
import ChatRoom from "./components/chatRoom";

function App() {
  const [conn, setConnection] = useState<HubConnection | null>(null);
  const [messages, setMessages] = useState<{ userName: string; msg: string }[]>(
    []
  );
  const [isConnected, setIsConnected] = useState(false);

  const joinChatRoom = async (userName: string, chatRoom: string) => {
    try {
      if (!conn) {
        const newConnection = new HubConnectionBuilder()
          .withUrl("https://localhost:7153/chats")
          .configureLogging(LogLevel.Information)
          .build();

        newConnection.on("JoinSpecificChatRoom", (userName, msg) => {
          console.log("User joined:", userName, "Message:", msg);
        });

        newConnection.on("ReciveSpecificMessage", (userName, msg) => {
          console.log("Received message:", msg);
          setMessages((prevMessages) => [...prevMessages, { userName, msg }]);
        });

        await newConnection.start();
        console.log("SignalR connection established");

        await newConnection.invoke("JoinSpecificChatRoom", {
          userName,
          chatRoom,
        });
        console.log(`${userName} joined ${chatRoom}`);

        setConnection(newConnection);
        setIsConnected(true);
      } else {
        console.log("Already connected to a SignalR hub");
      }
    } catch (error) {
      console.error("Error joining chat room:", error);
    }
  };

  const sendMessage = useCallback(
    async (message: string) => {
      try {
        await conn?.invoke("sendMessage", message);
      } catch (e) {
        console.log(e);
      }
    },
    [conn]
  );

  return (
    <>
      <main>
        <Container>
          <Row className="px-5 my-5"></Row>
          {!conn ? (
            <WaitingRoom joinChatRoom={joinChatRoom} />
          ) : (
            <ChatRoom messages={messages} sendMessage={sendMessage} />
          )}

          <Row className="mt-4">
            <Col>
              {isConnected ? (
                <h3>Connected to the chat room</h3>
              ) : (
                <h3>Please join a chat room</h3>
              )}
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}

export default App;
