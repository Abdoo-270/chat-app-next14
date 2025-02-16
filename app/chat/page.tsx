import ChatCamera from "../../components/chat/chat-camera";

export default function ChatRootPage() {
    return (
        <main className="flex-grow h-full flex items-center justify-center px-2 bg-sigMain"> 
            <div className="bg-chat bg-right-bottom rounded-3xl w-full h-full flex items-center justify-center px-6">
                <ChatCamera />
            </div>
        </main>
    );
}
