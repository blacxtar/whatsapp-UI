import React from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import joe from "../public/assets/dp.png"
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
  VoiceCallButton,
  VideoCallButton,
  Avatar,
  InfoButton,
  MessageSeparator,
  TypingIndicator,
  Conversation,
} from "@chatscope/chat-ui-kit-react";

function App() {
  return (
    <>
      <div style={{ position: "relative", height: "100vh", width: "100vw", display:'flex' }}>
        <div style={{display:"flex",flexDirection:"column", maxWidth:"20vw"}}>

      <Conversation style={{backgroundColor:"transparent"}} key="1" name="Lilly" lastSenderName="Lilly" info="Yes i can do it for you">
        <Avatar src={joe} name="Lilly" />
      </Conversation>
      <Conversation style={{backgroundColor:"transparent"}} key="1" name="Lilly" lastSenderName="Lilly" info="Yes i can do it for you">
        <Avatar src={joe} name="Lilly" />
      </Conversation> <Conversation style={{backgroundColor:"transparent"}} key="1" name="Lilly" lastSenderName="Lilly" info="Yes i can do it for you">
        <Avatar src={joe} name="Lilly" />
      </Conversation> <Conversation style={{backgroundColor:"transparent"}} key="1" name="Lilly" lastSenderName="Lilly" info="Yes i can do it for you">
        <Avatar src={joe} name="Lilly" />
      </Conversation>
        </div>
     <div style={{width:"80vw"}}>
     <MainContainer>
          <ChatContainer>
            <ConversationHeader
              style={{ backgroundColor: "#323739" }}
              key="1"
            >
              <Avatar name="Joe Rogan" src="public/assets/dp.png" />
              <ConversationHeader.Content
                userName="Emily"
                info="Active 10 mins ago"
              />
              <ConversationHeader.Actions>
                <VoiceCallButton />
                <VideoCallButton />
                <InfoButton />
              </ConversationHeader.Actions>
            </ConversationHeader>
            <MessageList
              key="2"
              typingIndicator={<TypingIndicator content="Emily is typing" />}
            >
              <MessageSeparator content="Saturday, 30 November 2019" />

              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Emily",
                  direction: "incoming",
                  position: "single",
                }}
              ></Message>
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sener: "Oliver",
                  direction: "outgoing",
                  position: "single",
                }}
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Emily",
                  direction: "incoming",
                  position: "first",
                }}
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Emily",
                  direction: "incoming",
                  position: "normal",
                }}
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Emily",
                  direction: "incoming",
                  position: "normal",
                }}
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Emily",
                  direction: "incoming",
                  position: "last",
                }}
              ></Message>
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  direction: "outgoing",
                  position: "first",
                }}
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  direction: "outgoing",
                  position: "normal",
                }}
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  direction: "outgoing",
                  position: "normal",
                }}
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  direction: "outgoing",
                  position: "last",
                }}
              />

              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Emily",
                  direction: "incoming",
                  position: "first",
                }}
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Emily",
                  direction: "incoming",
                  position: "last",
                }}
              ></Message>

              <MessageSeparator content="Saturday, 31 November 2019" />

              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Emily",
                  direction: "incoming",
                  position: "single",
                }}
              ></Message>
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Oliver",
                  direction: "outgoing",
                  position: "single",
                }}
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Emily",
                  direction: "incoming",
                  position: "first",
                }}
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Emily",
                  direction: "incoming",
                  position: "normal",
                }}
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Emily",
                  direction: "incoming",
                  position: "normal",
                }}
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Emily",
                  direction: "incoming",
                  position: "last",
                }}
              ></Message>
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  direction: "outgoing",
                  position: "first",
                }}
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  direction: "outgoing",
                  position: "normal",
                }}
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  direction: "outgoing",
                  position: "normal",
                }}
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  direction: "outgoing",
                  position: "last",
                }}
              />

              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Emily",
                  direction: "incoming",
                  position: "first",
                }}
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Emily",
                  direction: "incoming",
                  position: "last",
                }}
              ></Message>
            </MessageList>
            <MessageInput key={3} placeholder="Type message here" />
          </ChatContainer>
        </MainContainer>
     </div>
      </div>
    </>
  );
}

export default App;
