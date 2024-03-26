import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../../Hooks/useGetConversations";
import { useState } from "react";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
	e.preventDefault();
	if (!search) return;
	if (search.length < 3) {
	  return toast.error("Search term must be at least 3 characters long");
	}
  
	if (!conversations) {
	  return toast.error("No conversations available");
	}
  
	const conversation = conversations.find((c) =>
	  c.fullname.toLowerCase().includes(search.toLowerCase())
	);
  
	if (conversation) {
	  setSelectedConversation(conversation);
	  setSearch("");
	} else toast.error("No such user found!");
  };

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
      <input
        type='text'
        placeholder='Search…'
        className='input input-bordered rounded-full'
        value={search} // Bind value to search state
        onChange={(e) => setSearch(e.target.value)} // Update search state on change
      />
      <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
        <IoSearchSharp className='w-6 h-6 outline-none' />
      </button>
    </form>
  );
};

export default SearchInput;
