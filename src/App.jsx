import React, { useState, useEffect } from "react";
import {
  Phone,
  Video,
  MoreVertical,
  Search,
  Paperclip,
  Mic,
  Send,
  Smile,
  ArrowLeft, 
} from "lucide-react";
import { fetchChats, sendMessage, fetchMessages } from "./api";

const groupMessagesByDate = (messages) => {
  const groups = {};
  messages.forEach((msg) => {
    const date = new Date(msg.timestamp * 1000).toDateString();
    if (!groups[date]) groups[date] = [];
    groups[date].push(msg);
  });
  return groups;
};

const getDateTitle = (dateStr) => {
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (dateStr === today) return "Today";
  if (dateStr === yesterday) return "Yesterday";
  return dateStr;
};

const getStatusIcon = (status) => {
  switch (status) {
    case "sent":
      return "✔";
    case "delivered":
      return "✔✔";
    case "read":
      return "✔✔";
    default:
      return "";
  }
};

const formatTime = (timestampInSeconds) => {
  const date = new Date(timestampInSeconds * 1000);
  return date.toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};


function App() {
  const [chatList, setChatList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] =useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [showChatOnly, setShowChatOnly] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchChats().then((res) => {
      setChatList(res.data);
      if (res.data.length > 0 && !isMobile) {
        setSelectedUser(res.data[0]);
      }
    });
  }, [isMobile]);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser._id).then((res) => setMessages(res.data));
    }
  }, [selectedUser]);

  const handleSendMessage = async () => {
    if (messageInput.trim() && selectedUser) {
      await sendMessage(selectedUser._id, messageInput);
      const res = await fetchMessages(selectedUser._id);
      setMessages(res.data);
      setMessageInput("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 flex-col sm:flex-row overflow-hidden">
      {/* Sidebar  */}
      <div
        className={`w-full sm:w-80 bg-white border-r border-gray-200 flex flex-col ${
          isMobile && showChatOnly ? "hidden" : "flex"
        }`}
      >
        {/* Header */}
        <div className="bg-gray-50 p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">ME</span>
              </div>
              <h1 className="text-lg font-semibold text-gray-800">WhatsApp</h1>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-200 rounded-full">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search or start new chat"
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {chatList.map((chat) => (
            <div
              key={chat._id}
              onClick={() => {
                setSelectedUser(chat);
                if (isMobile) setShowChatOnly(true);
              }}
              className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${
                selectedUser?._id === chat._id ? "bg-gray-100" : ""
              }`}
            >
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-3 shrink-0">
                <span className="text-white font-semibold text-sm">
                  {chat.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {chat.name}
                  </h3>
                  <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                    {formatTime(chat.lastTimestamp)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate mt-1">
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div
        className={`flex-1 flex-col ${
          isMobile && !showChatOnly ? "hidden" : "flex"
        }`}
      >
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-3">
                {isMobile && (
                  <button
                    onClick={() => setShowChatOnly(false)}
                    className="mr-2 p-2 rounded-full hover:bg-gray-200"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>
                )}
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {selectedUser.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">
                    {selectedUser.name}
                  </h2>
                  <p className="text-sm text-gray-500">last seen recently</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-200 rounded-full">
                  <Phone className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded-full">
                  <Video className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded-full">
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto p-6 bg-gray-50"
              style={{
                background:"url('/assets/wa-bg.webp')"
              }}
            >
              <div className="max-w-4xl mx-auto space-y-4 flex flex-col">
                {Object.entries(groupMessagesByDate(messages)).map(
                  ([date, msgs]) => (
                    <div className=" flex flex-col" key={date}>
                      <div className="text-center self-center text-xs text-gray-500 mb-4 bg-gray-200 inline-block px-2 py-1 rounded-md">
                        {getDateTitle(date)}
                      </div>
                      {msgs.map((msg) => {
                        const isOutgoing = msg.from !== selectedUser.wa_id;
                        const statusIcon = isOutgoing
                          ? getStatusIcon(msg.status)
                          : "";
                        const isRead = msg.status === "read";

                        return (
                          <div
                            key={msg.id}
                            className={`flex ${
                              isOutgoing ? "justify-end" : "justify-start"
                            } mb-2`}
                          >
                            <div
                              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg relative ${
                                isOutgoing
                                  ? "bg-green-500 text-white"
                                  : "bg-white text-gray-800 shadow-sm"
                              }`}
                            >
                              <p className="text-sm">{msg.text}</p>
                              <div className="flex justify-end items-center space-x-1 mt-1">
                                <span
                                  className={`text-[0.7rem] ${
                                    isOutgoing
                                      ? "text-green-100"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {formatTime(msg.timestamp)}
                                </span>
                                {statusIcon && (
                                  <span
                                    className={`text-[0.7rem] ml-1 ${
                                      isRead ? "text-blue-300" : "text-green-100"
                                    }`}
                                  >
                                    {statusIcon}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Message Input */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 shrink-0">
              <div className="flex items-center space-x-3">
                <button className="p-2 hover:bg-gray-200 rounded-full">
                  <Smile className="w-6 h-6 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded-full">
                  <Paperclip className="w-6 h-6 text-gray-600" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type a message"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
                  />
                </div>
                {messageInput.trim() ? (
                  <button
                    onClick={handleSendMessage}
                    className="p-3 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center"
                  >
                    <Send className="w-5 h-5 text-white" />
                  </button>
                ) : (
                  <button className="p-2 hover:bg-gray-200 rounded-full">
                    <Mic className="w-6 h-6 text-gray-600" />
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-64 h-64 mx-auto mb-8 opacity-20">
                <svg viewBox="0 0 303 172" className="w-full h-full">
                  <path
                    fill="#DDD"
                    d="M229.9 0c-6.4 0-12.6 1.1-18.5 3.2L45.7 49.9c-17.7 6.4-29.7 23.4-29.7 42.2v40c0 24.8 20.2 45 45 45h183.9c24.8 0 45-20.2 45-45V45C290 20.2 269.8 0 245 0h-15.1z"
                  />
                  <circle fill="#FFF" cx="71" cy="96" r="20" />
                  <circle fill="#FFF" cx="151" cy="96" r="20" />
                  <circle fill="#FFF" cx="231" cy="96" r="20" />
                </svg>
              </div>
              <h2 className="text-2xl font-light text-gray-800 mb-2">
                WhatsApp Web
              </h2>
              <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
                Send and receive messages without keeping your phone online. Use
                WhatsApp on up to 4 linked devices and 1 phone at the same time.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;