import { useState } from "react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import AppHeader from "../../components/common/AppHeader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { CheckCircle2 } from "lucide-react";
const MySwal = withReactContent(Swal);

const AddNewCard = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const handleSubmit = () => {
    MySwal.fire({
      title: (
        <h2 className="text-3xl font-bold tracking-tight mt-6">
          Congratulations!
        </h2>
      ),
      html: (
        <p className="text-[#808080] text-lg">Your new card has been added.</p>
      ),

      icon: "success",
      iconHtml: (
        <CheckCircle2
          size={80}
          className="stroke-[#22A447] fill-[#22A447]/20"
          strokeWidth={1.5}
        />
      ),

      showConfirmButton: false,
      showCancelButton: false,

      customClass: {
        popup: "rounded-[32px] p-8 m-6 w-full max-w-[400px]",
        icon: "border-none bg-transparent m-0 p-0 flex items-center justify-center overflow-visible",
      },
      iconColor: "transparent",

      footer: (
        <div className="w-full px-4 mb-4">
          <Button
            variant="primary"
            className="w-full py-5 text-lg font-bold bg-black rounded-[16px]"
            onClick={() => {
              MySwal.close();
            }}
          >
            Thanks
          </Button>
        </div>
      ),
    });
  };
  return (
    <div className="relative min-h-screen bg-white pb-[100px]">
      {/* 1. Header */}
      <AppHeader title="New Card" showBack={true} rightIcon="notification" />

      <main className="px-5 space-y-6">
        <hr className="mb-5 text-[#E6E6E6]" />
        <h3 className="text-lg font-semibold mb-4">Add Debit or Credit Card</h3>

        <Input
          type="text"
          placeholder="Enter your card number"
          label="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="py-4 text-lg"
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            type="text"
            label="Expiry Date"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="py-4 text-lg"
          />

          <Input
            type="text"
            label="              Security Code"
            placeholder="CVC"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            className="py-4 text-lg"
          />
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-5 bg-white">
        <Button onClick={handleSubmit}>Add Card</Button>
      </footer>
    </div>
  );
};

export default AddNewCard;
