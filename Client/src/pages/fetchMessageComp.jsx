import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Navbar,
    NavRight,
    Page,
    Messages,
    MessagesTitle,
    Message,
    Messagebar,
    Link,
    MessagebarAttachments,
    MessagebarAttachment,
    MessagebarSheet,
    MessagebarSheetImage,
    f7ready,
    f7,
  } from 'framework7-react';

const FetchMessagesComponent = () => {
  const [messages, setMessages] = useState([]);


  // Function to fetch messages
  const fetchMessages = async () => {
    try {
      const response = await axios.post('http://0.0.0.0:3000/fetch-messages', {
        email: email // Send the email to fetch messages for
      });
      if (response.status === 200) {
        const data = response.data;
        // Assuming the response is an array of messages, set them in state
        setMessages(data);
      } else {
        console.log(response.data.error); // Log any error response
      }
    } catch (error) {
      console.error('Error fetching messages:', error.message);
    }
  };
  fetchMessages();
  // useEffect hook to fetch messages when component mounts or email changes
  useEffect(() => {
    if (email) {
      fetchMessages();
    }
  }, [email]);

  // Function to handle input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div>
      <h2>Fetch Messages</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={handleEmailChange}
      />

      <div>
        <h3>Messages:</h3>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FetchMessagesComponent;
