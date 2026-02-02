import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "../../components/ui/Button";
import AddressCard from "./components/AddressCard";

import {
  useGetAddressesQuery,
  useDeleteAddressMutation,
  useUpdateAddressMutation,
} from "../../store/api/addressApi";

import {
  showDestructiveAlert,
  showSuccessAlert,
} from "../../components/ui/Alerts";
import { useAppSelector } from "../../hooks/redux";

const ManageAddressesPage = () => {
  const navigate = useNavigate();

  // Track which address is being deleted (IMPORTANT)
  const [deletingAddressId, setDeletingAddressId] = useState<string | null>(
    null,
  );

  const { initialized, user } = useAppSelector((s) => s.auth);

  const { data: addresses = [], isLoading } = useGetAddressesQuery(undefined, {
    skip: !initialized || !user,
  });

  const [deleteAddress] = useDeleteAddressMutation();
  const [updateAddress] = useUpdateAddressMutation();

  // --- DELETE FLOW (SAFE & CONFIRMED) ---
  const handleDeleteClick = (addressId: string) => {
    showDestructiveAlert({
      title: "Delete Address?",
      message:
        "This address will be permanently removed. This action cannot be undone.",
      confirmText: "Delete Address",
      cancelText: "Cancel",
      onConfirm: () => confirmDelete(addressId),
    });
  };

  const confirmDelete = async (addressId: string) => {
    if (deletingAddressId) return; // guard against double delete

    setDeletingAddressId(addressId);

    try {
      await deleteAddress(addressId).unwrap();

      showSuccessAlert({
        title: "Address Deleted",
        message: "The address has been removed successfully.",
        confirmText: "Done",
      });
    } catch {
      toast.error("Failed to delete address");
    } finally {
      setDeletingAddressId(null);
    }
  };

  // --- SET DEFAULT ---
  const handleSetDefault = async (addressId: string) => {
    try {
      await updateAddress({
        id: addressId,
        data: { isDefault: true },
      }).unwrap();

      toast.success("Default address updated");
    } catch {
      toast.error("Failed to update default address");
    }
  };

  if (isLoading) {
    return <p className="p-5">Loading addresses...</p>;
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="space-y-4">
        <hr className="mb-5 text-[#E6E6E6]" />
        {addresses.map((address) => (
          <AddressCard
            key={address._id}
            address={address}
            isDeleting={deletingAddressId === address._id}
            onEdit={() => navigate(`/addresses/edit/${address._id}`)}
            onDelete={() => handleDeleteClick(address._id)}
            onSetDefault={
              address.isDefault
                ? undefined
                : () => handleSetDefault(address._id)
            }
          />
        ))}

        <Button variant="secondary" onClick={() => navigate("/addresses/new")}>
          + Add New Address
        </Button>
      </main>
    </div>
  );
};

export default ManageAddressesPage;
