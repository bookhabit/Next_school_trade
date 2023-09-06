// components/SocketsProvider.tsx
import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useSelector } from "../store"; // Adjust the import path based on your project structure
import { RootState } from "../store"; // Adjust the import path based on your project structure
import { SOCKET_URL } from "../config/default";

interface SocketContextType {
  socket?: Socket;
}

const SocketContext = createContext<SocketContextType>({});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const loggedUserId = useSelector((state: RootState) => state.user.id);
  const isLoggedIn = !!loggedUserId;

  console.log('socket',socket)

    useEffect(() => {
      console.log('1번쨰 useEffect')
      console.log('로그인 상태',isLoggedIn)
      if (isLoggedIn) {
        if (!socket) {
          console.log('백엔드 소켓 연결')
          const newSocket = io(SOCKET_URL);
          setSocket(newSocket);
        } else {
          // 이미 소켓이 있는 경우에는 다시 연결하지 않음
          console.log('이미 소켓이 연결되어 있습니다.');
        }
      }
    }, [isLoggedIn]);

    useEffect(() => {
      console.log('2번쨰 useEffect')
      if (socket) {
        console.log('소켓 이벤트 login emit')

        const handleLogin = (data:any) => {
          console.log('소켓 연결 성공', data);
        };

        socket.emit('login', loggedUserId);
        socket.on('login', handleLogin);
      }
    }, [socket]);


  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};