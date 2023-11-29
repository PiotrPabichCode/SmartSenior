import { useAppSelector } from '@src/redux/types';
import { selectActiveChat } from '@src/redux/chats/chats.slice';
import EmptyChat from './EmptyChat';
import MessageDisplay from './MessageDisplay';

const ChatScreen = () => {
  const activeChat = useAppSelector(state => selectActiveChat(state));

  if (!activeChat) {
    return <EmptyChat />;
  }

  return <MessageDisplay activeChat={activeChat} />;
};

export default ChatScreen;
