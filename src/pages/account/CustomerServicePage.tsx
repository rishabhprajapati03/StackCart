import { Image, Send } from "lucide-react";

const CustomerServicePage = () => {
  const chats = [
    {
      sender: [
        "Hello, good morning.",
        "I am a Customer Service, is there anything I can help you with?",
      ],
      time: "10:41 pm",
    },
    {
      receiver: [
        "Hi, I'm having problems with my order & payment.",
        "Can you help me?",
      ],
      time: "10:50 pm",
    },
    {
      sender: [
        "Of course...",
        "Can you tell me the problem you are having? so I can help solve it",
      ],
      time: "10:51 pm",
    },
  ];

  return (
    <div className="flex flex-col h-full bg-white relative">
      <hr className="mb-5 text-[#E6E6E6]" />

      <div className="flex justify-center mb-6">
        <span className="text-xs font-medium px-3 py-1 bg-[#E6E6E6] rounded-md">
          Today
        </span>
      </div>

      {/* Messsages */}
      <div className="flex-1 overflow-y-auto space-y-6 pb-24">
        {chats.map((chat, index) => {
          const isSender = !!chat.sender;
          const messages = chat.sender || chat.receiver;

          return (
            <div
              key={index}
              className={`flex flex-col ${
                isSender ? "items-start" : "items-end"
              }`}
            >
              <div className="max-w-[80%] space-y-3">
                {messages?.map((msg, msgIndex) => (
                  <div
                    key={msgIndex}
                    className={`px-5 py-3 text-sm text-wrap rounded-[10px] ${
                      isSender
                        ? "bg-[#E6E6E6] text-black rounded-bl-none"
                        : "bg-[#1A1A1A] text-white rounded-br-none"
                    }`}
                  >
                    {msg}
                  </div>
                ))}
              </div>

              <span className="text-[10px] text-[#808080] mt-2 px-1">
                {chat.time}
              </span>
            </div>
          );
        })}
      </div>
      <div className="fixed bottom-0 left-0 right-0 px-5 py-3 bg-white flex items-center gap-3 z-50">
        <div className="flex-1 relative flex items-center">
          <input
            type="text"
            placeholder="Write your message..."
            className="w-full bg-white border border-[#E6E6E6] rounded-[10px] py-4 pl-5 pr-12 outline-none text-sm"
          />
          <Image
            className="absolute right-4 text-[#808080] cursor-pointer"
            size={20}
          />
        </div>
        <button className="bg-[#1A1A1A] p-4 rounded-[10px] text-white active:scale-95 transition-transform">
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default CustomerServicePage;
