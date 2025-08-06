import axios from "axios";

const API = axios.create({
  baseURL: "https://whatsapp-be-4so8.onrender.com", 
});

// Get all chats 
export const fetchChats = () => API.get("/chats");

// Get messages for a user
export const fetchMessages = (wa_id) => API.get(`/chats/${wa_id}/messages`);

// Send message to a user
export const sendMessage = (wa_id, message) =>
  API.post(`/chats/${wa_id}/message`, {
    text: message,
    from: "918329446654", // sample user
    name: "You"
  });
