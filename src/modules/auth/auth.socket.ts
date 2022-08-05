import { Socket } from "socket.io";
import { ISocket } from "@common/types/socket.types";
import log from "@providers/logger.provider";

export class AuthSocket implements ISocket {
	public handleConnection = (socket: Socket): void => {
		log.info("[auth] Socket connected");
		socket.emit("auth_ping", { message: "Welcome to the auth socket" });

		socket.on("client_ping", (data: string) => {
			log.info("[socket] Client pinged");
			log.info(data);
		});
	};

	public middlewareImplementation = (socket: Socket, next: () => void): void => {
		// Implement middleware for auth here
		next();
	};
}

const authSocket = new AuthSocket();

export default authSocket;
