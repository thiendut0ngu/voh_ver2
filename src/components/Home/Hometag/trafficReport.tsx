import React from 'react';
import { useState } from 'react';
import './Chat.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator} from '@chatscope/chat-ui-kit-react';
import { MessageDirection } from "@chatscope/use-chat";

// const baseUrl = `https://customer-chatbot-server.azurewebsites.net/`
// const baseUrl = `https://api.customer-chat.com`
const baseUrl = `//${window.location.hostname}:5000`

interface MessageChat {
  message: string;
  direction: MessageDirection;
  sentTime?: string;
  sender: string;
  action?: any;
  position: 0 | "normal" | 2 | 1 | "single" | "first" | "last" | 3;
}

interface ChatGPTProps {                                              
  themeClassName: string;
}

const TrafficReport: React.FC<ChatGPTProps> = ({ themeClassName }) => {
  const [messages, setMessages] = useState<MessageChat[]>([
    {
    message: "Xin chào, tôi là trợ lý ảo. Tôi có thể giúp bạn tạo báo cáo giao thông.",
    sentTime: "just now",
    direction: MessageDirection.Incoming,
    sender: "ChatGPT",
    position: "normal",
    },
    // Bạn có thể tải lên 1 tệp hình có chữ để tôi có thể giúp bạn tốt hơn.
    {
    message: "Bạn có thể tải lên 1 tệp hình có chữ để tôi có thể giúp bạn tốt hơn.",
    sentTime: "just now",
    direction: MessageDirection.Incoming,
    sender: "ChatGPT",
    position: "normal",
    },
    // Lưu ý: Các đuôi hình hợp lệ là .jpg (.jpeg) hoặc .png. Sau mỗi lần tải hình, ngữ cảnh của trợ lý ảo sẽ bị xóa.
    {
    message: "Lưu ý: Các đuôi hình hợp lệ là .jpg (.jpeg) hoặc .png. Sau mỗi lần tải hình, ngữ cảnh của trợ lý ảo sẽ bị xóa.",
    sentTime: "just now",
    direction: MessageDirection.Incoming,
    sender: "ChatGPT",
    position: "normal",
    },
//     {
//       message: "What is the webpage about?",
//       sentTime: "just now",
//       direction: MessageDirection.Outgoing,
//       sender: "user",

//       action: () => handleRecommendButtonClick("What is the webpage about?"),
//     },
//     {
//       message: "Who hosted the webpage?",
//       sentTime: "just now",
//       direction: MessageDirection.Outgoing,
//       sender: "user",

//       action: () => handleRecommendButtonClick("Who hosted the webpage?"),
//     },
//     {
//       message: "Summarize the webpage",
//       sentTime: "just now",
//       direction: MessageDirection.Outgoing,
//       sender: "user",

//       action: () => handleRecommendButtonClick("Summarize the webpage"),
//     }
  ]);

  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isRecommend, setisRecommend] = useState<string>('need');
  const [contentTyping, setContentTyping] = useState<string>('NOIS GPT is typing')

  // handle Recommend Button Click
  const handleRecommendButtonClick = async (message: string) => {
    const newMessages: MessageChat[] = [{
      message: "Xin chào, tôi là trợ lý ảo. Tôi có thể giúp bạn tạo báo cáo giao thông.",
      sentTime: "just now",
      direction: MessageDirection.Incoming,
      sender: "ChatGPT",
      position: "normal",
    },
    // Bạn có thể tải lên 1 tệp hình có chữ để tôi có thể giúp bạn tốt hơn.
    {
      message: "Bạn có thể tải lên 1 tệp hình có chữ để tôi có thể giúp bạn tốt hơn.",
      sentTime: "just now",
      direction: MessageDirection.Incoming,
      sender: "ChatGPT",
      position: "normal",
    },
    // Lưu ý: Các đuôi hình hợp lệ là .jpg (.jpeg) hoặc .png. Sau mỗi lần tải hình, ngữ cảnh của trợ lý ảo sẽ bị xóa.
    {
      message: "Lưu ý: Các đuôi hình hợp lệ là .jpg (.jpeg) hoặc .png. Sau mỗi lần tải hình, ngữ cảnh của trợ lý ảo sẽ bị xóa.",
      sentTime: "just now",
      direction: MessageDirection.Incoming,
      sender: "ChatGPT",
      position: "normal",
    },

    {
      message: message,
      direction: MessageDirection.Outgoing,
      sentTime: "just now",
      sender: "user",
      position: "normal",
    }]
    
    setMessages(newMessages)
    setIsTyping(true);
    const responseMessage: any = await processMessageToChatGPT(newMessages); 
    const responseData: MessageChat = {
      message: responseMessage,
      sentTime: "just now",
      direction: MessageDirection.Incoming,
      sender: "ChatGPT",
      position: "normal",
    }

    setMessages([...newMessages, responseData])
    setisRecommend('noneed')
  };

  const handleSend = async (message: string) => {
    const newMessage: MessageChat = {
      message,
      direction: MessageDirection.Outgoing,
      sentTime: "just now",
      sender: "user",
      position: "normal",
    };
    let newMessages: MessageChat[] = [];

    if (JSON.stringify(messages.slice(0, 6)) === JSON.stringify([
      {
        message: "Hello, I'm Assistant. I'm here to assist you with any questions you may have.",
        sentTime: "just now",
        direction: MessageDirection.Incoming,
        sender: "ChatGPT",
        position: "normal",
      },
      {
        message: "If you provide me with a link to a website, I can analyze the content of that website and answer any questions you have based on the information available on the site.",
        sentTime: "just now",
        direction: MessageDirection.Incoming,
        sender: "ChatGPT",
        position: "normal",
      },
      {
        message: "Please feel free to share the link with me, and I'll do my best to provide you with the information you need.",
        sentTime: "just now",
        direction: MessageDirection.Incoming,
        sender: "ChatGPT",
        position: "normal",
      },
      {
        message: "What is the webpage about?",
        sentTime: "just now",
        direction: MessageDirection.Outgoing,
        sender: "user",
        position: "normal",
        action: () => handleRecommendButtonClick("What is the webpage about?"),
      },
      {
        message: "Who hosted the webpage?",
        sentTime: "just now",
        direction: MessageDirection.Outgoing,
        sender: "user",
        position: "normal",
        action: () => handleRecommendButtonClick("Who wrote this passage"),
      },
      {
        message: "Summarize the webpage",
        sentTime: "just now",
        direction: MessageDirection.Outgoing,
        sender: "user",
        position: "normal",
        action: () => handleRecommendButtonClick("Summarize the webpage"),
      }
    ])){
      setisRecommend('noneed')

      newMessages = [{
        message: "Hello, I'm Assistant. I'm here to assist you with any questions you may have.",
        sentTime: "just now",
        direction: MessageDirection.Incoming,
        sender: "ChatGPT",
        position: "normal",
      },
      {
        message: "If you provide me with a link to a website, I can analyze the content of that website and answer any questions you have based on the information available on the site.",
        sentTime: "just now",
        direction: MessageDirection.Incoming,
        sender: "ChatGPT",
        position: "normal",
      },
      {
        message: "Please feel free to share the link with me, and I'll do my best to provide you with the information you need.",
        sentTime: "just now",
        direction: MessageDirection.Incoming,
        sender: "ChatGPT",
        position: "normal",
      },
      {
        message: "Successfully loaded the webpage.",
        sentTime: "just now",
        direction: MessageDirection.Incoming,
        sender: "ChatGPT",
        position: "normal",
      }, newMessage];
    }
    else{
      newMessages = [...messages, newMessage];
    }
    
    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setMessages(newMessages)
    setIsTyping(true);

    const responseMessage: any = await processMessageToChatGPT(newMessages); 
    const responseData: MessageChat = {
      message: responseMessage,
      sentTime: "just now",
      direction: MessageDirection.Incoming,
      sender: "ChatGPT",
      position: "normal",
    }
    setMessages([...newMessages, responseData])
  };

  async function processMessageToChatGPT(chatMessages: MessageChat[]) {
    try {
      const response = await fetch(`${baseUrl}/chatTechSupport`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chatMessages[chatMessages.length - 1]?.message),
        "credentials": "include",
      });
      
      setIsTyping(false);

      if (response.ok) {
        const responseData = await response.json();
        return responseData.value;
      
      } else {
        // Handle the error case
        throw new Error("Request failed with status: " + response.status);
      }
    } catch (error) {
      // Handle any network or other errors
      console.error("Error:", error);
    }
  }

  const handleAttachClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
  // Create a file input element
  const fileInput = document.createElement('input');
  fileInput.type = 'file';

  // Set up an event listener for file selection
  fileInput.addEventListener('change', async (event) => {
    const selectedFile = (event.target as HTMLInputElement).files?.[0];
    if (selectedFile) {
      // Create a FormData object and append the selected file to it
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        setContentTyping("Uploading document")
        setIsTyping(true)

        const response = await fetch(`${baseUrl}/imageTechSupport`, {
          method: 'POST',
          body: formData,
          "credentials": "include",
        });

        setIsTyping(false)
        setContentTyping("NOIS GPT is typing")
        if (response.ok) {
            const responseData = await response.json();
            setMessages([...messages, {
              message: responseData.value,
              direction: MessageDirection.Incoming,
              sentTime: "just now",
              sender: "ChatGPT",
              position: "normal",
            }]);
          // Handle the successful response from the backend
          console.log('File uploaded successfully', responseData.value);
        } else {
            setMessages([...messages, {
              message: "Your file exceeded the file size limit of 20 MBs. Try again with another file.\nThis limit is imposed only for this demo, and does not reflect the actual application.",
              direction: MessageDirection.Incoming,
              sentTime: "just now",
              sender: "ChatGPT",
              position: "normal",
            }]);
//          throw new Error('Request failed with status: ' + response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  });

  // Trigger the file input click event
  fileInput.click();
};
  
  return (
    <div className={`App ${themeClassName}-chat-root`}>
      <MainContainer>
        <ChatContainer>       
          <MessageList 
            className={`${themeClassName}-incoming ${themeClassName}-${isRecommend}-outgoing ${themeClassName}-messagelist`}
            scrollBehavior="auto" 
            typingIndicator={isTyping ? <TypingIndicator content="NOIS GPT is typing" /> : null}
          >
            {messages.map((message: MessageChat, i: number) => {
              return <div style={{display: 'block'}} onClick={message.action}>
                <Message key={i} model={message} />
                </div>;
            })}
          </MessageList>
          <MessageInput placeholder="Type your message here ..." autoFocus onSend={handleSend} onAttachClick={handleAttachClick}/>
          
        </ChatContainer>
      </MainContainer>
    </div>
  )
};

export default TrafficReport;