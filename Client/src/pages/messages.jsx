import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaFilePdf,FaArrowCircleDown } from "react-icons/fa";
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
} from "framework7-react";

import DateTimeComponent from "./DateTimeComp";
import FileUploadComponent from "./FileUploadComponent";

//grmini api
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

const apiKey = "AIzaSyBzoFM1RecRFQhJCFCT_O8m_9kgB9t_OYw";
//const apiKey = 'AIzaSyCgvxmdok1C_GjXPvghBSVFA8Ekbt0AZj8'
const genAI = new GoogleGenerativeAI(apiKey);

const generationConfig = {
  stopSequences: ["red"],
  maxOutputTokens: 2000,
  temperature: 0.9,
  topP: 1,
  topK: 1,
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

const model = genAI.getGenerativeModel({
  model: "gemini-pro",
  generationConfig,
});

//const defaultprompt="You are a human Scholar named 'DocuScholar' not chatini model and you are creator is 'Madhurya Hait' Now your job is that you will be asked questions based on that and you need to answer as text chat messages using emojis😊 just like a person, You will be given a question after this instruction ends now you need to answer them like a common chat in format .";
const prompt2 =
  "Answer with text & emjois in short just like human chat your name is 'docuscholar' made by madhurya";

const MessagesPage = () => {
  const [messagesDataServer, setMessagesDataServer] = useState([]);
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text: "You are a human Scholar named 'DocuScholar' not Gemini model and you are creator is 'Madhurya Hait' Now your job is that you will be asked questions based on pdf long text chunk and you need to answer as text chat messages using emojis😊 just like a person. ",
          },
        ],
      },
      {
        role: "model",
        parts: [
          { text: "Sure, From now on I am DocuScholar made by Madhurya Hait" },
        ],
      },
    ],
  });

  const PDFData = localStorage.getItem("PDFData");
  useEffect(() => {
    if (PDFData) {
      const fetchData = async () => {
        try {
          const textLength = PDFData.length;
          const chunkSize = 5000;

          // Loop through the text in chunks
          for (let i = 0; i < textLength; i += chunkSize) {
            // Get the chunk of text
            console.log(i);
            const chunk = PDFData.slice(i, i + chunkSize);

            // Send the message

            const s = await chat.sendMessage(`PARAGRAPH INPUT :${chunk} `);
            const resp = await s.response.text();

            console.log(resp);
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  }, [PDFData]);

  async function generateAnswer(prp) {
    console.log("======= GEMINI CALLED =======");
    //let prompt =prp.text;
    try {
      if (PDFData) {
        //  const result = await chat.sendMessage(`Answer Question based on the Given Paragraph with text & emjois remember your name is 'Docuscholar' made by madhurya PARAGRAPH : `);
        const result1 = await chat.sendMessage(`QUESTION : ${prp.text}`);
        const response = await result1.response;
        const text = response.text();
        const history = await chat.getHistory();
        console.log("hist", history);
        console.log("reply", text);
        localStorage.setItem("BotAnswer", text);
      } else {
        const result = await chat.sendMessage(`Question : ${prp.text}`);
        const response = await result.response;
        const text = response.text();

        const history = await chat.getHistory();
        console.log(history);
        console.log(text);
        localStorage.setItem("BotAnswer", text);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const [messagesFetched, setMessagesFetched] = useState([]);
  const email = localStorage.getItem("email");
  const [messagesBottom, setMessagesBottom] = useState(true); 
  //messages fetch
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.post(
          "http://192.168.38.239:3000/fetchmessages",
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

  if (messagesDataServer != []) {
    useEffect(() => {
      const sendMsgToServer = async () => {
        //console.log("message",messagesDataServer);
        try {
          const response = await axios.post(
            "http://192.168.38.239:3000/message",
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
    }, [messagesDataServer]);
  }

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
  // const deleteAttachment = (image) => {
  //   const index = attachments.indexOf(image);
  //   attachments.splice(index, 1);
  //   setAttachments([...attachments]);
  // };
  // //for image
  // const handleAttachment = (e) => {
  //   const index = f7.$(e.target).parents('label.checkbox').index();
  //   const image = images[index];
  //   if (e.target.checked) {
  //     // Add to attachments
  //     attachments.unshift(image);
  //   } else {
  //     // Remove from attachments
  //     attachments.splice(attachments.indexOf(image), 1);
  //   }
  //   setAttachments([...attachments]);
  // };

  const sendMessage = () => {
    const text = messageText.replace(/\n/g, "<br>").trim();
    generateAnswer({ text: text });
    localStorage.setItem("curText", text);
    setMessagesDataServer([
      {
        email,
        text,
        bot: false,
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
    setMessagesData([...messagesData, ...messagesToSend]);
    setMessageText("");

    // Focus area
    if (text.length) messagebar.current.focus();

    // Mock response
    if (responseInProgress.current) return;

    responseInProgress.current = true;

    setTimeout(() => {
      if (localStorage.getItem("BotAnswer") == "") {
        const answer = "Netwrok Error Please Ask Again";

        const person = people[0];
        setTypingMessage({
          name: person.name,
          avatar: img,
        });
        setTimeout(() => {
          setTypingMessage(null);

          setMessagesData([
            ...messagesData,
            ...messagesToSend,
            {
              text: answer,
              type: "received",
              name: person.name,
              avatar: img,
            },
          ]);

          setMessagesDataServer([
            {
              email,
              text: answer,
              bot: true,
            },
          ]);
          responseInProgress.current = false;
        }, 4000);
      } else {
        const answer = localStorage.getItem("BotAnswer");

        const person = people[0];
        setTypingMessage({
          name: person.name,
          avatar: img,
        });
        setTimeout(() => {
          setTypingMessage(null);
          setMessagesData([
            ...messagesData,
            ...messagesToSend,
            {
              text: answer,
              type: "received",
              name: person.name,
              avatar: img,
            },
          ]);

          setMessagesDataServer([
            {
              email,
              text: answer,
              bot: true,
            },
          ]);
          responseInProgress.current = false;
        }, 7500);
      } //typing time
      localStorage.removeItem("BotAnswer");
    }, 5000);
  };

  const chatRef = useRef(null);
  useEffect(() => {
    // Check if the chat is scrolled to the bottom
    const isScrolledToBottom =
      chatRef.current.scrollTop + chatRef.current.clientHeight ===
      chatRef.current.scrollHeight;
    setMessagesBottom(isScrolledToBottom);
  }, [messagesDataServer]);

  const scrollToBottom = () => {
    // Scroll the chat to the bottom
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  };



  return (
    <Page>
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
          // onClick={() => {
          //   setSheetVisible(!sheetVisible);
          // }}
          popupOpen=".Upload-popup-push"
        />
        <Link
          iconIos="f7:arrow_up_circle_fill"
          iconMd="material:send"
          slot="inner-end"
          onClick={sendMessage}
        />

        <MessagebarAttachments></MessagebarAttachments>

        <MessagebarSheet>
          <FileUploadComponent />
        </MessagebarSheet>
      </Messagebar>
      <Messages ref={chatRef}>
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
            {message.text && (
              <span
                slot="text"
                dangerouslySetInnerHTML={{ __html: message.text }}
              />
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
      {!messagesBottom && (
        <div className="bottom-arrow" onClick={scrollToBottom}>
          <FaArrowCircleDown />
        </div>
      )}
    </Page>
  );
};

export default MessagesPage;
