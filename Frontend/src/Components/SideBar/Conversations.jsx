import useGetConversations from "../../../Hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emoji";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversations,idx) => (
        <Conversation
		 key={conversations._id}
		 conversation={conversations}
		 emoji={getRandomEmoji()} 
		 lastIdx = {idx === conversations.length - 1}/>
      ))}
    </div>
  );
};
export default Conversations;
