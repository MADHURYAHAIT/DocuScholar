
import React, { useEffect, useRef, useState } from 'react';
import { FaFilePdf } from "react-icons/fa";

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
import DateTimeComponent from './DateTimeComp';
import FileUploadComponent from './FileUploadComponent';
const MessagesPage =() => {
  const handleFilePickerChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Do something with the selected file, e.g., add it to attachments
      const newAttachments = [...attachments, selectedFile];
      setAttachments(newAttachments);
    }
  };
  
  const images = [
    'https://cdn.framework7.io/placeholder/cats-300x300-1.jpg',
    'https://cdn.framework7.io/placeholder/cats-200x300-2.jpg',
    'https://cdn.framework7.io/placeholder/cats-400x300-3.jpg',
    'https://cdn.framework7.io/placeholder/cats-300x150-4.jpg',
    'https://cdn.framework7.io/placeholder/cats-150x300-5.jpg',
    'https://cdn.framework7.io/placeholder/cats-300x300-6.jpg',
    'https://cdn.framework7.io/placeholder/cats-300x300-7.jpg',
    'https://cdn.framework7.io/placeholder/cats-200x300-8.jpg',
    'https://cdn.framework7.io/placeholder/cats-400x300-9.jpg',
    'https://cdn.framework7.io/placeholder/cats-300x150-10.jpg',
  ];
  const people = [
    {
      name: 'DocuScholar',
      avatar: '/images/profile.jpg',
    },
  ];
  const answers = [
    'Yes!',
    'No',
    'Hm...',
    'I am not sure',
    'And what about you?',
    'May be ;)',
    'Ami Tomake BHalo Basi',
    'Hari Bol',
    'Wtf kkrh ho',
    'Lorem ipsum dolor sit amet, consectetur',
    'What?',
    
    'Are you sure?',
    'Of course',
    'Need to think about it',
    'Amazing!!!',
  ];
  const [attachments, setAttachments] = useState([]);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [typingMessage, setTypingMessage] = useState(null);
  const [messageText, setMessageText] = useState('');
  const img='/images/profile.jpg';
  const [messagesData, setMessagesData] = useState([
    
    {
      name: 'DocuScholar',
      type: 'received',
      text: 'Hi 🌻 beautiful, This is DocuScholar, made by Madhurya.',
      avatar: `${img}`,
      
    },
    {
      name: 'DocuScholar',
      setTimeout: 1000,
      type: 'received',
      text: 'I am here to help you with your queries, just submit your queries in the left panel and I will find you correct answers through it. 🥀',
      avatar: `${img}`,
    },
    {
      name: 'DocuScholar',
      type: 'received',
      text: 'How can I help you today? 🙏🏻',
      avatar:  `${img}`,
     

    },
    // {
    //   name: 'DocuScholar',
    //   type: 'received',
    //   footer: 'Just now',
    //   avatar: `${img}`,
    //   image: 'https://i.pinimg.com/736x/2a/3f/94/2a3f94b2a43d4e72bc87a56ef0e45a10.jpg',
    // },
    


  ]);

  const responseInProgress = useRef(false);
  const messagebar = useRef(null);

  const attachmentsVisible = () => {
    return attachments.length > 0;
  };
  const placeholder = () => {
    return attachments.length > 0 ? 'Add comment or Send' : 'Ask me questions';
  };
  useEffect(() => {
    f7ready(() => {
      messagebar.current = f7.messagebar.get('.messagebar');
    });
  });
  const isFirstMessage = (message, index) => {
    const previousMessage = messagesData[index - 1];
    if (message.isTitle) return false;
    if (
      !previousMessage ||
      previousMessage.type !== message.type ||
      previousMessage.name !== message.name
    )
      return true;
    return false;
  };
  const isLastMessage = (message, index) => {
    const nextMessage = messagesData[index + 1];
    if (message.isTitle) return false;
    if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name)
      return true;
    return false; 
  };
  const isTailMessage = (message, index) => {
    const nextMessage = messagesData[index + 1];
    if (message.isTitle) return false;
    if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name)
      return true;
    return false;
  };
  const deleteAttachment = (image) => {
    const index = attachments.indexOf(image);
    attachments.splice(index, 1);
    setAttachments([...attachments]);
  };
  const handleAttachment = (e) => {
    const index = f7.$(e.target).parents('label.checkbox').index();
    const image = images[index];
    if (e.target.checked) {
      // Add to attachments
      attachments.unshift(image);
    } else {
      // Remove from attachments
      attachments.splice(attachments.indexOf(image), 1);
    }
    setAttachments([...attachments]);
  };
  const sendMessage = () => {
    const text = messageText.replace(/\n/g, '<br>').trim();
    const messagesToSend = [];
    attachments.forEach((attachment) => {
      messagesToSend.push({
        image: attachment,
      });
    });
    if (text.length) {
      messagesToSend.push({
        text,
      });
    }
    if (messagesToSend.length === 0) {
      return;
    }
    setAttachments([]);
    setSheetVisible(false);
    setMessagesData([...messagesData, ...messagesToSend]);
    setMessageText('');

    // Focus area
    if (text.length) messagebar.current.focus();

    // Mock response
    if (responseInProgress.current) return;

    responseInProgress.current = true;

    setTimeout(() => {
      const answer = answers[Math.floor(Math.random() * answers.length)];
      const person = people[Math.floor(Math.random() * people.length)];
      setTypingMessage({
        name: person.name,
        avatar: person.avatar,
      });
      setTimeout(() => {
        setTypingMessage(null);
        setMessagesData([
          ...messagesData,
          ...messagesToSend,
          {
            text: answer,
            type: 'received',
            name: person.name,
            avatar: person.avatar,
          },
        ]);
        responseInProgress.current = false;
      }, 1000); //typing time
    }, 1000);
  };






  return (
    <Page>
      <Navbar title={<><FaFilePdf className='ninja'/> DocuScholar</>}> 
      {/* PdfMassiah */}
      
        <NavRight>
          <Link iconIos="f7:menu" iconMd="material:menu" className='menu'  popupOpen=".demo-popup-push" /> 
          {/* panelOpen="left" */}
        </NavRight>
      </Navbar>

      <Messagebar
        placeholder={placeholder()}
        attachmentsVisible={attachmentsVisible()}
        sheetVisible={sheetVisible}
        value={messageText}
        onInput={(e) => setMessageText(e.target.value)}
      >
      <Link
        iconIos="f7:paperclip_fill"
        iconMd="material:attach_file"
        slot="inner-start"
        onClick={() => {
          setSheetVisible(!sheetVisible);
        }}
      />
        <Link
          iconIos="f7:arrow_up_circle_fill"
          iconMd="material:send"
          slot="inner-end"
          onClick={sendMessage}
        />
        <MessagebarAttachments>
          {attachments.map((image, index) => (
            <MessagebarAttachment
              key={index}
              image={image}
              onAttachmentDelete={() => deleteAttachment(image)}
            />
          ))}
        </MessagebarAttachments>
        <MessagebarSheet>

          {images.map((image, index) => (
            <MessagebarSheetImage
              key={index}
              image={image}
              checked={attachments.indexOf(image) >= 0}
              onChange={handleAttachment}
            />
          ))}
        </MessagebarSheet>
      </Messagebar>

      <Messages>
        <MessagesTitle>
          <DateTimeComponent/>
        </MessagesTitle>

        {messagesData.map((message, index) => (
          <Message
            key={index}
            type={message.type}
            image={message.image}
            name={message.name}
            avatar={message.avatar}
            first={isFirstMessage(message, index)}
            last={isLastMessage(message, index)}
            tail={isTailMessage(message, index)}
          >
            {message.text && (
              <span slot="text" dangerouslySetInnerHTML={{ __html: message.text }} />
            )}
          </Message>
        ))}
        {typingMessage && (
          <Message
            type="received"
            typing={true}
            first={true}
            last={true}
            tail={true}
            header={`${typingMessage.name} is typing`}
            avatar={typingMessage.avatar}
          />
        )}
      </Messages>
    </Page>
  );
};

export default MessagesPage;
