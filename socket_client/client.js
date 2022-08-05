//////////////////////////// Direct approach ////////////////////////////

// import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

// const socket = io("http://localhost:3050/auth");

// socket.on("connect", () => {
// 	socket.on("auth_ping", (message) => {
// 		console.log(message);
// 	});

// 	socket.on("logged_in", (message) => {
// 		console.log(message);
// 	});

// 	socket.emit("client_ping", "[socket-client] Client ping pong");
// });

/////////////////////////// Namespace approach ///////////////////////////

import { Manager } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const manager = new Manager("http://localhost:3050", {
	reconnectionDelayMax: 10000,
});

const authSocket = manager.socket("/auth"); // auth namespace

authSocket.on("connect", () => {
	authSocket.on("auth_ping", (message) => {
		console.log(message);
	});

	authSocket.on("logged_in", (message) => {
		console.log(message);
	});

	authSocket.emit("client_ping", "[socket-client] Client ping pong");
});
