import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, List, ListItem, ListItemText } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

const MessageBoard = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = async () => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
      id: uuidv4(),
      message: newMessage,
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss')
    });
    setMessages([...messages, response.data]);
    setNewMessage('');
  };

  return (
    <div>
      <TextField
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        label="Enter your message"
      />
      <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
      <List>
        {messages.map((message) => (
          <ListItem key={message.id}>
            <ListItemText primary={message.message} secondary={message.timestamp} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default MessageBoard;