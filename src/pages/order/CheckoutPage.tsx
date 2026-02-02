import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MapPin, CreditCard, Banknote, Smartphone } from "lucide-react";
import toast from "react-hot-toast";

import AppHeader from "../../components/common/AppHeader";
import Button from "../../components/ui/Button";
import CalculationSummary from "../cart/Summary/CalculationSummary";

import { useAppSelector } from "../../hooks/redux";
import { useGetCartQuery } from "../../store/api/cartApi";
import { useGetAddressesQuery } from "../../store/api/addressApi";
import { useCreateOrderMutation } from "../../store/api/ordersApi";

import type { PaymentMethod, Address } from "../../types";
import { showSuccessAlert } from "../../components/ui/Alerts";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { initialized, user } = useAppSelector((s) => s.auth);

  /* ---------------- CART ---------------- */
  const { data: cart, isLoading: cartLoading } = useGetCartQuery(undefined, {
    skip: !initialized || !user,
  });

  /* ---------------- ADDRESSES ---------------- */
  const { data: addresses = [], isLoading: addressLoading } =
    useGetAddressesQuery(undefined, {
      skip: !initialized || !user,
    });

  /* ---------------- SELECTED ADDRESS ---------------- */
  const selectedFromAddressPage = location.state?.selectedAddress as
    | Address
    | undefined;

  const checkoutAddress = useMemo(() => {
    if (selectedFromAddressPage) return selectedFromAddressPage;
    return addresses.find((a) => a.isDefault) ?? null;
  }, [selectedFromAddressPage, addresses]);

  /* ---------------- PAYMENT ---------------- */
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CARD");

  /* ---------------- ORDER ---------------- */
  const [createOrder, { isLoading: placingOrder }] = useCreateOrderMutation();

  /* ---------------- GUARDS ---------------- */
  useEffect(() => {
    if (!cartLoading && (!cart || cart.items.length === 0)) {
      navigate("/cart", { replace: true });
    }
  }, [cart, cartLoading, navigate]);

  if (cartLoading || addressLoading) {
    return <p className="p-5">Preparing checkout…</p>;
  }

  if (!cart) return null;

  /* ---------------- PLACE ORDER ---------------- */
  const handlePlaceOrder = async () => {
    if (!checkoutAddress) {
      toast.error("Please select a delivery address");
      navigate("/checkout/address");
      return;
    }

    try {
      const order = await createOrder({
        addressId: checkoutAddress._id,
        paymentMethod,
      }).unwrap();

      showSuccessAlert({
        title: "Order Placed!",
        message: "Your order has been placed successfully.",
        confirmText: "Track Order",
        onConfirm: () =>
          navigate(`/track-order/${order._id}`, { replace: true }),
      });
    } catch (err: any) {
      toast.error(err?.data?.message ?? "Failed to place order");
    }
  };

  return (
    <div className="relative min-h-screen bg-white pb-30">
      <AppHeader title="Checkout" showBack rightIcon="none" />

      <main className="p-5 space-y-8">
        {/* DELIVERY ADDRESS */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Delivery Address</h3>
            <Link
              to="/checkout/address"
              state={{ selectedAddressId: checkoutAddress?._id }}
              className="text-sm underline font-medium"
            >
              Change
            </Link>
          </div>

          {!checkoutAddress ? (
            <div className="p-4 border border-[#E6E6E6] rounded-xl text-center">
              <p className="text-sm text-gray-600 mb-3">
                Please add a delivery address to continue.
              </p>
              <Button onClick={() => navigate("/addresses/new")}>
                Add Address
              </Button>
            </div>
          ) : (
            <div className="flex gap-4 items-start">
              <div className="bg-gray-100 p-3 rounded-full">
                <MapPin size={20} />
              </div>

              <div>
                <p className="font-semibold">{checkoutAddress.fullName}</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {checkoutAddress.addressLine1}
                  {checkoutAddress.addressLine2 &&
                    `, ${checkoutAddress.addressLine2}`}
                  <br />
                  {checkoutAddress.city}, {checkoutAddress.state}{" "}
                  {checkoutAddress.postalCode}
                  <br />
                  {checkoutAddress.country}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Phone: {checkoutAddress.phone}
                </p>
              </div>
            </div>
          )}
        </section>

        <hr className="border-[#E6E6E6]" />

        {/* PAYMENT METHOD */}
        <section>
          <h3 className="text-lg font-bold mb-4">Payment Method</h3>

          <div className="flex gap-3">
            <PaymentButton
              active={paymentMethod === "CARD"}
              onClick={() => setPaymentMethod("CARD")}
              icon={<CreditCard size={18} />}
              label="Card"
            />
            <PaymentButton
              active={paymentMethod === "UPI"}
              onClick={() => setPaymentMethod("UPI")}
              icon={<Smartphone size={18} />}
              label="UPI"
            />
            <PaymentButton
              active={paymentMethod === "COD"}
              onClick={() => setPaymentMethod("COD")}
              icon={<Banknote size={18} />}
              label="Cash"
            />
          </div>
        </section>

        <hr className="border-[#E6E6E6]" />

        {/* ORDER SUMMARY */}
        <section>
          <h3 className="text-lg font-bold mb-4">Order Summary</h3>
          <CalculationSummary items={cart.items} />
        </section>
      </main>

      {/* PLACE ORDER */}
      <footer className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-[#E6E6E6] z-50">
        <Button
          onClick={handlePlaceOrder}
          disabled={placingOrder}
          isSubmitting={placingOrder}
        >
          Place Order
        </Button>
      </footer>
    </div>
  );
};

export default CheckoutPage;

const PaymentButton = ({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) => (
  <button
    onClick={onClick}
    className={`flex-1 flex items-center justify-center gap-2 py-3 border rounded-xl ${
      active ? "bg-black text-white border-black" : "border-[#E6E6E6]"
    }`}
  >
    {icon}
    <span className="font-semibold text-sm">{label}</span>
  </button>
);
