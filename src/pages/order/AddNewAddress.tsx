import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AppHeader from "../../components/common/AppHeader";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";
import { useCreateAddressMutation } from "../../store/api/addressApi";
import type { AddressInput } from "../../types";
import { showSuccessAlert } from "../../components/ui/Alerts";

const AddNewAddress = () => {
  const navigate = useNavigate();

  const [createAddress, { isLoading, error }] = useCreateAddressMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm<AddressInput>({ mode: "onBlur" });

  const showInputSuccess = isValid && isSubmitted && !error;

  const onSubmit = async (data: AddressInput) => {
    try {
      await createAddress(data).unwrap();
      showSuccessAlert({
        title: "Congratulations!",
        message: "Your new Address has been added.",
        confirmText: "Done",
        onConfirm: () => navigate(-1),
      });
    } catch {
      toast.error("Failed to add address");
    }
  };

  return (
    <div>
      <AppHeader title="Add New Address" showBack rightIcon="notification" />
      <main className="px-5">
        <hr className="mb-5 text-[#E6E6E6] " />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Input
            label="Full Name"
            {...register("fullName", { required: "Full name is required" })}
            error={errors.fullName?.message}
            success={showInputSuccess && !errors.fullName}
          />

          <Input
            label="Phone"
            {...register("phone", { required: "Phone is required" })}
            error={errors.phone?.message}
            success={showInputSuccess && !errors.phone}
          />

          <Input
            label="Address Line 1"
            {...register("addressLine1", {
              required: "Address is required",
            })}
            error={errors.addressLine1?.message}
            success={showInputSuccess && !errors.addressLine1}
          />

          <Input
            label="City"
            {...register("city", { required: "City is required" })}
            error={errors.city?.message}
            success={showInputSuccess && !errors.city}
          />

          <Input
            label="State"
            {...register("state", { required: "State is required" })}
            error={errors.state?.message}
            success={showInputSuccess && !errors.state}
          />

          <Input
            label="Postal Code"
            {...register("postalCode", {
              required: "Postal code is required",
            })}
            error={errors.postalCode?.message}
            success={showInputSuccess && !errors.postalCode}
          />

          <Input
            label="Country"
            {...register("country", { required: "Country is required" })}
            error={errors.country?.message}
            success={showInputSuccess && !errors.country}
          />

          <Button
            type="submit"
            disabled={!isValid || isLoading}
            isSubmitting={isLoading}
          >
            Add Address
          </Button>
        </form>
      </main>
    </div>
  );
};

export default AddNewAddress;
