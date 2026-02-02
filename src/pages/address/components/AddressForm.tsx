import { useForm } from "react-hook-form";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import type { AddressInput } from "../../../types";

type Props = {
  defaultValues?: Partial<AddressInput>;
  onSubmit: (data: AddressInput) => Promise<void>;
  isSubmitting?: boolean;
  submitLabel: string;
  showSetDefault?: boolean;
};

const AddressForm = ({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel,
  showSetDefault = false,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm<AddressInput>({
    mode: "onBlur",
    defaultValues,
  });

  const showInputSuccess =
    isValid && isSubmitted && !Object.keys(errors).length;

  return (
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
        {...register("addressLine1", { required: "Address is required" })}
        error={errors.addressLine1?.message}
        success={showInputSuccess && !errors.addressLine1}
      />

      <Input label="Address Line 2" {...register("addressLine2")} />

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
        {...register("postalCode", { required: "Postal code is required" })}
        error={errors.postalCode?.message}
        success={showInputSuccess && !errors.postalCode}
      />

      <Input
        label="Country"
        {...register("country", { required: "Country is required" })}
        error={errors.country?.message}
        success={showInputSuccess && !errors.country}
      />

      {showSetDefault && (
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register("isDefault")} />
          Set as default address
        </label>
      )}

      <Button
        type="submit"
        disabled={!isValid || isSubmitting}
        isSubmitting={isSubmitting}
      >
        {submitLabel}
      </Button>
    </form>
  );
};

export default AddressForm;
