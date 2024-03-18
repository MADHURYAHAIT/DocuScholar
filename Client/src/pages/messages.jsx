import axios from 'axios';
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

//grmini api
import { GoogleGenerativeAI } from '@google/generative-ai';
const apiKey = 'AIzaSyBzoFM1RecRFQhJCFCT_O8m_9kgB9t_OYw';
const genAI = new GoogleGenerativeAI(apiKey);
const generationConfig = {
  maxOutputTokens: 80,
};
const model = genAI.getGenerativeModel({ model: "gemini-pro",generationConfig }); 
const defaultprompt="Remember from now on you are a text chatbot named 'DocuScholar' not gemini model and your creator is 'Madhurya Hait' Now your job is that you need to read the pdf text input and then you will be asked questions based on that and you need to answer as text chat messages using nice signs & emojis😊 just like a person"; 


const MessagesPage =() => {
  model.generateContent(defaultprompt);
  const[flag,setFlag]=useState(0);
  const[messagesDataServer,setMessagesDataServer]=useState([]);
 
  

  
  // const fetchGemini = async () => {
  //   try {
  //     const response = await axios.post('http://192.168.3.239:3000/fetchgemini', {
  //       msg:localStorage.getItem("curText"), 
  //     });
  //     if (response.status === 200) {
  //       const data = response.data;
  //       console.log("Gemini Response Fetch Success !");
  //       console.log(data);
  //       setAnswers(data);
  //     } else {
  //       console.log(response.data.error); // Log any error response
  //     }
  //   } catch (error) {
  //     console.error('Error fetching messages:', error.message);
  //   }
  // };



  // useEffect(() => {
  //   fetchGemini();
  // }, [flag]);


useEffect(() => {
let prompt = localStorage.getItem("curText");
async function generateAns() {
  try {
// Specify Gemini-Pro model
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text); 
    localStorage.setItem("BotAnswer",text);

  } catch (error) {
    console.error(error);
  }
}

generateAns();
}, [flag]);






  const [messagesFetched, setMessagesFetched] = useState([]);
  const [email,setEmail]=useState(localStorage.getItem('email'));
  //messages fetch
  const fetchMessages = async () => {
    try {
      const response = await axios.post('http://192.168.3.239:3000/fetchmessages', {
        email, 
      });
      if (response.status === 200) {
        const data = response.data;
        console.log("Response Fetch Success !");
        setMessagesFetched(data);
      } else {
        console.log(response.data.error); // Log any error response
      }
    } catch (error) {
      console.error('Error fetching messages:', error.message);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);
  


  if( messagesDataServer != []){
      useEffect(() => {
          const sendMsgToServer = async () => {
         //console.log("message",messagesDataServer); 
          try {
            const response = await axios.post( 'http://192.168.3.239:3000/message', {
              messagesDataServer,
            }, {
              headers: {
                'Content-Type': 'application/json'
              }
            });
        
            if (response.status === 200) {
              const data = response.data;
              console.log(data);
              
              console.log(flag);
        
            } else {
              const errorData = response.data;
              console.log(errorData.error); 
            }
          } catch (error) {
            console.error('Error during signup:', error.message);
          }
          
        } 
        sendMsgToServer();
      }, [messagesDataServer]);
  }


  
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
 
  
  const img='/images/profile.jpg';
  
  const [attachments, setAttachments] = useState([]);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [typingMessage, setTypingMessage] = useState(null);
  const [messageText, setMessageText] = useState('');
  let a =[
    
    {
      name: 'DocuScholar', 
      type: 'received',
      text: 'Hi 🌻 beautiful, This is DocuScholar, made by Madhurya.',
      avatar: `${img}`,
      
    },
    {
      name: 'DocuScholar',
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
  ]

  const [messagesData, setMessagesData] = useState(a);

  const [processedFetchedMsg, setProcessedFetchedMsg] = useState([]);

    useEffect(() => {

      setProcessedFetchedMsg(
        messagesFetched.map((message, index) => (
        {
        name: message.bot ? 'DocuScholar' : null,
        type: message.bot ? 'received' : 'sent',
        text: message.text,
        avatar: message.bot ? `${img}` : null,
      })));

     
      
    }, [messagesFetched]);
    

    useEffect(()=>{
      let b=[...messagesData,...processedFetchedMsg];
        console.log(...b);
        setMessagesData([...messagesData,...processedFetchedMsg]);
        //localStorage.setItem('TotalMsgData', JSON.stringify(b));
    }, [processedFetchedMsg]);

    
    // useEffect(() => {
    //   // Retrieve messagesData from local storage
    //   const storedMessages = localStorage.getItem('TotalMsgData');
    //   if (storedMessages) {
    //     setMessagesData(JSON.parse(storedMessages));
    //   }
    // }, []);



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
  //for image
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
  const  sendMessage =  () => {
  
    const text = messageText.replace(/\n/g, '<br>').trim();
    localStorage.setItem("curText",text);
    setFlag(()=>flag+1);
    setMessagesDataServer([
      {
        email,
        text,
        bot:false,
      },
    ]);

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
    //localStorage.getItem('Total')
    setMessagesData([...messagesData, ...messagesToSend]);
    setMessageText('');

    // Focus area
    if (text.length) messagebar.current.focus();

    // Mock response
    if (responseInProgress.current) return;

    responseInProgress.current = true;

    setTimeout(() => {
      
      if (localStorage.getItem("BotAnswer")==''){
        const answer = "Netwrok Error Please Try again";
     
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
  
          setMessagesDataServer([
            {
              email,
              text: answer,
              bot:true,
            },
          ]);
          responseInProgress.current = false;
          
        }, 3000);
      }
      else{
      const answer = localStorage.getItem("BotAnswer");
     
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

        setMessagesDataServer([
          {
            email,
            text: answer,
            bot:true,
          },
        ]);
        responseInProgress.current = false;
        
      }, 3000); }//typing time
      
    }, 3500);
  };

  //console.log("JSR",JSON.parse(localStorage.getItem('TotalMsgData')));




  return (
    <Page>
      <Navbar title={<><FaFilePdf className='ninja'/> DocuScholar</>}> 
      {/* PdfMassiah */}
      
        <NavRight>
        <img
          src="/images/me.jpg"
          className="profile-img"
          alt="User Image"
          width="30"
          onClick={() => f7.panel.open('left')}
         /> 
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

        {

          messagesData.map((message, index) => (
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
      ))


    }
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
