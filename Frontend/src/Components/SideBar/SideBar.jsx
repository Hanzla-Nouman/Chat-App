import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SeachInput";

const Sidebar = () => {
	return (
		<div className='border-r bg-slate-700 border-slate-500 p-4 flex flex-col'>
			<SearchInput />
			<div className='divider px-3'></div>
			<Conversations />
			<LogoutButton />
		</div>
	);
};
export default Sidebar;