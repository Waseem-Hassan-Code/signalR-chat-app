import { Row, Col } from "react-bootstrap";
import { ChatMessage } from "../Model/ChatMessages";
import MessageContainer from "./messageContainer";
import SendMessageForm from "./sendMessageForm";

interface ChatRoomProps {
  messages: ChatMessage[];
  sendMessage: (msg: string) => void;
}
const ChatRoom: React.FC<ChatRoomProps> = ({ messages, sendMessage }) => {
  return (
    <>
      <Row className="px-5 py-5">
        <Col sm={10}>
          <h2>Chat Room</h2>
        </Col>
        <Col></Col>
      </Row>
      <Row className="px-5 py-5">
        <Col sm={12}>
          <MessageContainer messages={messages} />
        </Col>
        <Col sm={12}>
          <SendMessageForm sendMessage={sendMessage} />
        </Col>
      </Row>
    </>
  );
};

export default ChatRoom;
