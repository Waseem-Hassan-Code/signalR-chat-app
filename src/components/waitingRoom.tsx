import { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";

interface WaitingRoomProps {
  joinChatRoom: (userName: string, chatRoom: string) => void;
}

const WaitingRoom: React.FC<WaitingRoomProps> = ({ joinChatRoom }) => {
  const [userName, setUserName] = useState<string>("");
  const [chatRoom, setChatRoom] = useState<string>("");

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        if (userName.trim() && chatRoom.trim()) {
          joinChatRoom(userName, chatRoom);
        } else {
          alert("Both fields are required!");
        }
      }}
    >
      <Col sm={12}>
        <Form.Group controlId="userName">
          <Form.Control
            type="text"
            placeholder="Enter your username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="chatRoom" className="mt-3">
          <Form.Control
            type="text"
            placeholder="Enter chat room name"
            value={chatRoom}
            onChange={(e) => setChatRoom(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Join Chat Room
        </Button>
      </Col>
    </Form>
  );
};

export default WaitingRoom;
