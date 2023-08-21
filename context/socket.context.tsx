// components/SocketsProvider.tsx
import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useSelector } from "../store"; // Adjust the import path based on your project structure
import { RootState } from "../store"; // Adjust the import path based on your project structure
import { SOCKET_URL } from "../config/default";
import EVENTS from "../config/events";

interface SocketContextType {
  socket?: Socket;
}

const SocketContext = createContext<SocketContextType>({});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const loggedUserId = useSelector((state: RootState) => state.user.id);
  const isLoggedIn = !!loggedUserId;

  useEffect(() => {
    if (isLoggedIn) {
      const newSocket = io(SOCKET_URL);
      setSocket(newSocket);
    }
  }, [isLoggedIn]);

  useEffect(()=>{
    if(socket){
      socket.emit('login',loggedUserId)
      socket.on('login',(data)=>{
          console.log('소켓연결성공',data)
      })
    }
  },[socket,isLoggedIn])

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};