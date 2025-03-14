import { auth } from "../../auth";
import { getUsersForSidebar } from "../../lib/data";
import Chat from "./chat";


const Chats = async () => {
	const session = await auth();
    console.log(session)
	const chats = session?.user ? await getUsersForSidebar(session.user._id) : [];
	console.log(chats)
	return (
		<nav className='flex-1 overflow-y-auto'>
			<ul>
				{chats.map((chat) => (
					<Chat key={chat._id  as string} chat={chat} />
				))}
			</ul>
		</nav>
	);
};
export default Chats; 