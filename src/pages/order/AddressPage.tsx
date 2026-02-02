import { useState, useEffect } from "react";
import { MapPin, Plus } from "lucide-react";
import Button from "../../components/ui/Button";
import AppHeader from "../../components/common/AppHeader";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useGetAddressesQuery } from "../../store/api/addressApi";

const AddressPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data: addresses = [], isLoading } = useGetAddressesQuery();

  // 👇 preselect address coming from checkout (if any)
  const checkoutSelectedId = location.state?.selectedAddressId as
    | string
    | undefined;

  const defaultId =
    checkoutSelectedId ??
    addresses.find((a) => a.isDefault)?._id ??
    addresses[0]?._id;

  const [selectedId, setSelectedId] = useState<string | undefined>(defaultId);

  useEffect(() => {
    if (!selectedId && addresses.length > 0) {
      setSelectedId(defaultId);
    }
  }, [addresses, defaultId, selectedId]);

  if (isLoading) {
    return <p className="p-5">Loading addresses...</p>;
  }

  return (
    <div className="relative min-h-screen bg-white pb-[100px]">
      <AppHeader showBack title="Address" rightIcon="notification" />

      <main className="px-5">
        <hr className="mb-5 text-[#E6E6E6]" />
        <h3 className="text-lg font-bold mb-4">Saved Address</h3>

        <div className="space-y-3">
          {addresses.map((item) => (
            <div
              key={item._id}
              onClick={() => setSelectedId(item._id)}
              className={`flex items-center justify-between py-4 px-5 border rounded-[20px] cursor-pointer ${
                selectedId === item._id
                  ? "border-black shadow-sm"
                  : "border-[#E6E6E6]"
              }`}
            >
              <div className="flex gap-3.5">
                <MapPin size={20} />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{item.fullName}</h4>
                    {item.isDefault && (
                      <span className="bg-[#E6E6E6] text-[10px] px-2 py-0.5 rounded-md">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-[#808080] text-sm truncate max-w-[200px]">
                    {item.addressLine1}, {item.city}
                  </p>
                </div>
              </div>

              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedId === item._id ? "border-black" : "border-[#E6E6E6]"
                }`}
              >
                {selectedId === item._id && (
                  <div className="w-3.5 h-3.5 bg-black rounded-full" />
                )}
              </div>
            </div>
          ))}

          <Link to="/addresses/new">
            <Button variant="secondary" LeftIcon={<Plus />}>
              Add New Address
            </Button>
          </Link>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-5 bg-white">
        <Button
          disabled={!selectedId}
          onClick={() => {
            const selectedAddress = addresses.find((a) => a._id === selectedId);

            if (!selectedAddress) return;

            navigate("/checkout", {
              replace: true,
              state: { selectedAddress },
            });
          }}
          className="py-5 text-lg font-bold"
        >
          Apply
        </Button>
      </footer>
    </div>
  );
};

export default AddressPage;
