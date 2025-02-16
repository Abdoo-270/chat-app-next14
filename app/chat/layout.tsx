import ChatSideBar from "../../components/chat/chat-sidebar";

const Layout = ({ children }: React.PropsWithChildren) => {
    return (
        <main className="flex h-screen bg-sigMain">
            <div className="hidden md:block w-[25%] h-full"> {/* Show sidebar only on medium screens and above */}
                <ChatSideBar />
            </div>
            <div className="md:hidden fixed top-0 left-0 w-full h-full bg-sigMain z-10"> {/* Fixed sidebar for small screens */}
                <ChatSideBar />
            </div>
            <div className="w-full md:w-[75%] h-full flex flex-col"> {/* Ensure children container has full height */}
                {children}
            </div>
        </main>
    );
};

export default Layout;
