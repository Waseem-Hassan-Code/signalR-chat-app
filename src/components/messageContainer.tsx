import React from "react";
import { ChatMessage } from "../Model/ChatMessages";

interface MessageContainerProps {
  messages: ChatMessage[];
}

const MessageContainer: React.FC<MessageContainerProps> = ({ messages }) => {
  return (
    <div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Username
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Message
            </th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {msg.userName}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {msg.msg}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MessageContainer;
