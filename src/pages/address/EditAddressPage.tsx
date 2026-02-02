import { useParams, useNavigate } from "react-router-dom";
import AppHeader from "../../components/common/AppHeader";
import AddressForm from "./components/AddressForm";
import {
  useGetAddressByIdQuery,
  useUpdateAddressMutation,
} from "../../store/api/addressApi";
import toast from "react-hot-toast";
import type { AddressInput } from "../../types";
import { useAppSelector } from "../../hooks/redux";

const EditAddressPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { initialized, user } = useAppSelector((s) => s.auth);

  const { data: address, isLoading } = useGetAddressByIdQuery(id!, {
    skip: !id || !initialized || !user,
  });

  const [updateAddress, { isLoading: isUpdating }] = useUpdateAddressMutation();

  if (isLoading) {
    return <p className="p-5">Loading address...</p>;
  }

  if (!address) {
    return <p className="p-5">Address not found</p>;
  }

  const handleSubmit = async (data: AddressInput) => {
    try {
      await updateAddress({
        id: address._id,
        data,
      }).unwrap();

      toast.success("Address updated");
      navigate(-1);
    } catch {
      toast.error("Failed to update address");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <AppHeader title="Edit Address" showBack />

      <main className="p-5">
        <AddressForm
          defaultValues={{
            fullName: address.fullName,
            phone: address.phone,
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2,
            city: address.city,
            state: address.state,
            postalCode: address.postalCode,
            country: address.country,
          }}
          onSubmit={handleSubmit}
          isSubmitting={isUpdating}
          submitLabel="Save Changes"
          showSetDefault={!address.isDefault}
        />
      </main>
    </div>
  );
};

export default EditAddressPage;
