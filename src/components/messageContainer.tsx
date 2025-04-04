import React from "react";
import { ChatMessage } from "../Model/ChatMessages";
import "./messageContainer.css"; // Don't forget to create this CSS file

interface MessageContainerProps {
  messages: ChatMessage[];
}

const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const getRandomColor = (name: string): string => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${hash % 360}, 70%, 60%)`;
};

const MessageContainer: React.FC<MessageContainerProps> = ({ messages }) => {
  return (
    <div className="chat-container">
      {messages.map((msg, index) => (
        <div className="message-row" key={index}>
          <div
            className="avatar"
            style={{ backgroundColor: getRandomColor(msg.userName) }}
          >
            {getInitials(msg.userName)}
          </div>
          <div className="message-bubble">
            <div className="sender-name">{msg.userName}</div>
            <div className="message-text">{msg.msg}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageContainer;
