import { io } from "socket.io-client";



const socket = io("https://chatgpt-ai-v21u.onrender.com", {
    withCredentials: true
});


socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});


export default socket