import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // update to your backend's URL if deployed
});

// Get all chats (user list)
export const fetchChats = () => API.get("/chats");

// Get messages for a user
export const fetchMessages = (wa_id) => API.get(`/chats/${wa_id}/messages`);

// Send message to a user
export const sendMessage = (wa_id, message) =>
  API.post(`/chats/${wa_id}/message`, {
    text: message,
    from: "918329446654", // you can hardcode or make dynamic later
    name: "You"
  });
