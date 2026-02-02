import React, { useState } from "react";
import { Mic, Search, ChevronDown, ChevronUp } from "lucide-react";
import InputTwo from "../../components/ui/InputTwo";

const Accordion = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-[#E6E6E6] rounded-[10px] px-5 py-3.5 mb-3.5 overflow-hidden bg-white space-y-[9px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left"
      >
        <span className="text-base font-medium text-[#1A1A1A]">{question}</span>
        {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </button>

      {isOpen && (
        <p className="text-[#808080] leading-relaxed text-sm">{answer}</p>
      )}
    </div>
  );
};

const General = () => (
  <div className="">
    <Accordion
      question="How do I make a purchase?"
      answer="When you find a product you want to purchase, tap on it to view the product details. Check the price, description, and available options, and then tap the 'Add to Cart' button."
    />
    <Accordion
      question="What payment methods are accepted?"
      answer="We accept Credit/Debit cards, PayPal, and local bank transfers."
    />
    <Accordion
      question="How do I track my orders?"
      answer="Go to your Profile > My Orders to see real-time tracking updates."
    />
    <Accordion
      question="Can I cancel or return an order?"
      answer="Yes, returns are accepted within 30 days of delivery."
    />
  </div>
);

const FAQsPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { header: "General", content: <General /> },
    {
      header: "Account",
      content: <div className="">Account Settings</div>,
    },
    {
      header: "Service",
      content: <div className="">Service Support</div>,
    },
    {
      header: "Payment",
      content: <div className="">Payment History</div>,
    },
  ];

  return (
    <div className="pb-5 w-full mx-auto bg-white ">
      <hr className="mb-6 text-[#E6E6E6]" />
      {/* tab header */}
      <div className="flex h-8 gap-2.5 overflow-x-auto no-scrollbar ">
        {tabs.map((tab, index) => (
          <button
            key={tab.header}
            onClick={() => setActiveTab(index)}
            className={`px-5 h-full rounded-[10px] text-base flex items-center pt-0.5 justify-center font-medium border whitespace-nowrap
              ${
                activeTab === index
                  ? "bg-[#1A1A1A] text-white border-black"
                  : "bg-white text-black border-[#E6E6E6]"
              }`}
          >
            {tab.header}
          </button>
        ))}
      </div>

      {/* search input  */}
      <div className="my-4">
        <InputTwo
          leftIcon={Search}
          rightIcon={Mic}
          type="text"
          placeholder="Search for questions..."
        />
      </div>

      {/* Content */}
      <div className="">{tabs[activeTab].content}</div>
    </div>
  );
};

export default FAQsPage;
