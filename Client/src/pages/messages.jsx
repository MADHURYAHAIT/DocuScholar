import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
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
  NavLeft,
} from "framework7-react";

import DateTimeComponent from "./DateTimeComp";
import FileUploadComponent from "./FileUploadComponent";
import { FaLinkedinIn } from "react-icons/fa6";

const MessagesPage = () => {
  const [FastApiAns, setFastApiAns] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messagesDataServer, setMessagesDataServer] = useState([]);
  const [messagesDataServer2, setMessagesDataServer2] = useState([]);

  const PDFData = localStorage.getItem("PDFData");

  const [messagesFetched, setMessagesFetched] = useState([]);
  const email = localStorage.getItem("email");

  //messages fetch
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.post(
          "https://docuscholar.onrender.com/fetchmessages",
          {
            email,
          }
        );
        if (response.status === 200) {
          const data = response.data;
          console.log("Backend Response Fetch Success !");
          setMessagesFetched(data);
        } else {
          console.log(response.data.error); // Log any error response
        }
      } catch (error) {
        console.error("Error fetching messages:", error.message);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    if (messagesDataServer.length > 0) {
      const sendMsgToServer = async () => {
        setIsLoading(true);
        try {
          const response = await axios.post(
            "https://docuscholar.onrender.com/message",
            {
              messagesDataServer,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.status === 200) {
            const data = response.data;
            console.log(data);

            //console.log(flag);
          } else {
            const errorData = response.data;
            console.log(errorData.error);
          }
        } catch (error) {
          console.error("Error during signup:", error.message);
        }
      };
      sendMsgToServer();
    }
  }, [messagesDataServer]);

  // useEffect(() => {
  //   if (messagesDataServer2.length > 0) {
  //     const sendQuestionToServer = async () => {
  //       try {
  //         const response = await axios.get(`https://fastapi-app-ufg5.onrender.com/ask?user_question=${encodeURIComponent(messagesDataServer2[0])}`);
  //         if (response.status === 200) {
  //           const responseData = response.data;
  //           // Process the response data as needed
  //           console.log("Server Response:", responseData.response);

  //           setFastApiAns(responseData.response);
  //         } else {
  //           console.log("Error:", response.data.detail); // Log any error response
  //         }
  //       } catch (error) {
  //         console.error("Error asking question:", error.message);
  //       }
  //     };
  //     sendQuestionToServer();
  //   }
  // }, [messagesDataServer2]);

  const images = ["https://cdn.framework7.io/placeholder/cats-300x300-1.jpg"];
  const people = [
    {
      name: "DocuScholar",
    },
  ];
  const img = "/images/profile.jpg";

  const [attachments, setAttachments] = useState([]);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [typingMessage, setTypingMessage] = useState(null);
  const [messageText, setMessageText] = useState("");
  let a = [
    {
      name: "DocuScholar",
      type: "received",
      text: "Hi 🌻 beautiful, This is DocuScholar, made by Madhurya.",
      avatar: `${img}`,
    },
    {
      name: "DocuScholar",
      type: "received",
      text: "I am here to help you with your queries, just submit your queries in the left panel and I will find you correct answers through it. 🥀",
      avatar: `${img}`,
    },
    {
      name: "DocuScholar",
      type: "received",
      text: "How can I help you today? 🙏🏻",
      avatar: `${img}`,
    },
  ];

  const [messagesData, setMessagesData] = useState(a);
  const [processedFetchedMsg, setProcessedFetchedMsg] = useState([]);

  useEffect(() => {
    setProcessedFetchedMsg(
      messagesFetched.map((message, index) => ({
        name: message.bot ? "DocuScholar" : null,
        type: message.bot ? "received" : "sent",
        text: message.text,
        avatar: message.bot ? `${img}` : null,
      }))
    );
  }, [messagesFetched]);

  useEffect(() => {
    let b = [...messagesData, ...processedFetchedMsg];
    setMessagesData([...messagesData, ...processedFetchedMsg]);
    // console.log(...b);
    //localStorage.setItem('TotalMsgData', JSON.stringify(b));
  }, [processedFetchedMsg]);

  const responseInProgress = useRef(false);
  const messagebar = useRef(null);

  const attachmentsVisible = () => {
    return attachments.length > 0;
  };
  const placeholder = () => {
    return attachments.length > 0 ? "Add comment or Send" : "Ask me questions";
  };

  useEffect(() => {
    f7ready(() => {
      messagebar.current = f7.messagebar.get(".messagebar");
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
    if (
      !nextMessage ||
      nextMessage.type !== message.type ||
      nextMessage.name !== message.name
    )
      return true;
    return false;
  };
  const isTailMessage = (message, index) => {
    const nextMessage = messagesData[index + 1];
    if (message.isTitle) return false;
    if (
      !nextMessage ||
      nextMessage.type !== message.type ||
      nextMessage.name !== message.name
    )
      return true;
    return false;
  };

  const sendMessage = () => {
    const text = messageText.replace(/\n/g, "<br>").trim();
    localStorage.setItem("curText", text);
    setMessagesDataServer([
      {
        email,
        text,
        bot: false,
      },
    ]);

    setMessagesDataServer2([text]);

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
    setMessageText("");

    // Focus area
    if (text.length) messagebar.current.focus();

    // Mock response
    if (responseInProgress.current) return;

    responseInProgress.current = true;

    setTimeout(async () => {
      setTypingMessage({
        name: "DocuScholar",
        avatar: img,
      });

      try {
        const response = await axios.get(`https://fastapi-app-ufg5.onrender.com/ask?user_question=${encodeURIComponent(text)}`);
        if (response.status === 200) {
          const responseData = response.data;
          // Process the response data as needed
          console.log("Server Response:", responseData.response);

          setFastApiAns(responseData.response);
          setTypingMessage(null);

          setMessagesData((prevMessagesData) => [
            ...prevMessagesData,
            {
              text: responseData.response,
              type: "received",
              name: "DocuScholar",
              avatar: img,
            },
          ]);

          setMessagesDataServer([
            {
              email,
              text: responseData.response,
              bot: true,
            },
          ]);

          responseInProgress.current = false;
        } else {
          console.log("Error:", response.data.detail); // Log any error response
          setTypingMessage(null);
          responseInProgress.current = false;
        }
      } catch (error) {
        console.error("Error asking question:", error.message);
        setTypingMessage(null);
        responseInProgress.current = false;
      }
    }, 1500);
  };

  return (
    <Page>
      <div className='Linkdin'>
        <a  id="no-underline" href="/li/"> 
          <div className='bx'> 
            <FaLinkedinIn style={{fontSize:'25px'}}/> 
          </div> 
            <div className='rotate-90'><b>connect</b> </div> 
        </a>
      </div>

      <Navbar
        title={
          <>
            <FaFilePdf className="ninja" /> DocuScholar
          </>
        }
      >
        <NavRight>
          <img
            src="/images/me.jpg"
            className="profile-img"
            alt="User Image"
            width="30"
            onClick={() => f7.panel.open("left")}
          />
          <Link
            iconIos="f7:menu"
            iconMd="material:menu"
            className="menu"
            popupOpen=".demo-popup-push"
          />
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
          popupOpen=".Upload-popup-push"
        />
        <Link
          iconIos="f7:arrow_up_circle_fill"
          iconMd="material:send"
          slot="inner-end"
          onClick={sendMessage}
        />

        {/* <MessagebarAttachments></MessagebarAttachments> */}


          <FileUploadComponent />

      </Messagebar>
      <Messages  >
        <MessagesTitle>
          <DateTimeComponent />
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
            {/* Render message text */}
            {message.text && (
              <span
                slot="text"
                dangerouslySetInnerHTML={{ __html: message.text }}
              />
            )}
          </Message>
        ))}
        
        {/* Render typing message */}
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

      {/* { (
        <div className="bottom-arrow" onClick={scrollToBottom}>
          <FaArrowCircleDown />
        </div>
      )} */}

    </Page>
  );
};

export default MessagesPage;
