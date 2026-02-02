import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";
import AppHeader from "../../components/common/AppHeader";

const PaymentMethodPage = () => {
  const [selectedCard, setSelectedCard] = useState(1);

  const savedCards = [
    {
      id: 1,
      type: "VISA",
      number: "**** **** **** 2512",
      isDefault: true,
    },
    {
      id: 2,
      type: "MasterCard",
      number: "**** **** **** 5421",
      isDefault: false,
      isMc: true,
    },
    {
      id: 3,
      type: "VISA",
      number: "**** **** **** 2512",
      isDefault: false,
    },
  ];

  return (
    <div className="relative min-h-screen bg-white pb-[100px]">
      <AppHeader
        title="Payment Method"
        showBack={true}
        rightIcon="notification"
      />

      <main className="px-5">
        <h3 className="text-lg font-bold mb-5">Saved Cards</h3>

        <div className="space-y-4">
          {savedCards.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelectedCard(card.id)}
              className={`flex items-center justify-between py-4 px-5  border rounded-[20px] cursor-pointer transition-all ${
                selectedCard === card.id
                  ? "border-black shadow-sm"
                  : "border-[#E6E6E6]"
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Card Logo Placeholder */}
                <div className="w-12">
                  {card.isMc ? (
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full  bg-black opacity-80" />
                      <div className="w-6 h-6 rounded-full bg-black opacity-80" />
                    </div>
                  ) : (
                    <span className={`italic font-black text-black text-xl `}>
                      VISA
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base tracking-wider">
                      {card.number}
                    </span>
                    {card.isDefault && (
                      <span className="bg-[#E6E6E6] text-[10px] px-2 py-0.5 rounded-md font-medium text-[#808080]">
                        Default
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Radio Indicator */}
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedCard === card.id ? "border-black" : "border-[#E6E6E6]"
                }`}
              >
                {selectedCard === card.id && (
                  <div className="w-3.5 h-3.5 bg-black rounded-full" />
                )}
              </div>
            </div>
          ))}

          {/* Add New Card Button */}
          <Link to={"/addnewcard"}>
            <Button variant="secondary" LeftIcon={<Plus />}>
              Add New Card
            </Button>
          </Link>
        </div>
      </main>

      {/* Fixed Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-5 bg-white z-50">
        <Button variant="primary" className="py-5 text-lg font-bold">
          Apply
        </Button>
      </footer>
    </div>
  );
};

export default PaymentMethodPage;
