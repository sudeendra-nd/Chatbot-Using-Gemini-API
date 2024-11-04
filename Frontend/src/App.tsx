import { useState, ChangeEvent, KeyboardEvent } from 'react';
import axios from 'axios';
import './App.css';

interface Message {
  text: string;
  type: 'user' | 'bot';
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  const handleSendMessage = async () => {
    if (input.trim() === '') return;
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, type: 'user' }
    ]);

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/data', {
        input: input
      });
      const botReply = response.data.reply;
      setMessages((prevMessages) => [
        ...prevMessages,
        //{ text: input, type: 'user' },
        { text: botReply, type: 'bot' }
      ]);
    } catch (error) {
      console.error('Error communicating with the backend:', error);

    }
    setInput('');
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="App">
      <div className="chat-container">
        <div className="message-box">
          <h1>Welcome to my ChatBot</h1>
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.type}-message`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Ask me anything..."
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
          <button onClick={handleSendMessage}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default App;