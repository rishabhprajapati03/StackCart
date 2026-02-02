import { MapPin, Pencil, Trash } from "lucide-react";
import Button from "../../../components/ui/Button";
import type { Address } from "../../../types";

type Props = {
  address: Address;
  onEdit: () => void;
  onDelete: () => void;
  onSetDefault?: () => void;
  isDeleting?: boolean;
};

const AddressCard = ({
  address,
  onEdit,
  onDelete,
  onSetDefault,
  isDeleting = false,
}: Props) => {
  const isBusy = isDeleting;

  return (
    <div
      className={`border border-[#E6E6E6] rounded-xl p-4 space-y-2 transition-opacity ${
        isBusy ? "opacity-60 pointer-events-none" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <MapPin size={20} />

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold">{address.fullName}</h4>

            {address.isDefault && (
              <span className="text-xs px-2 py-0.5 bg-gray-200 rounded">
                Default
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600">
            {address.addressLine1}
            {address.addressLine2 && `, ${address.addressLine2}`}
            <br />
            {address.city}, {address.state} {address.postalCode}
            <br />
            {address.country}
          </p>

          <p className="text-sm text-gray-600 mt-1">Phone: {address.phone}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-2">
        {!address.isDefault && onSetDefault && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onSetDefault}
            disabled={isBusy}
          >
            Set as Default
          </Button>
        )}

        <div className="grid grid-cols-2 w-full gap-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={onEdit}
            disabled={isBusy}
          >
            <Pencil size={14} />
            Edit
          </Button>

          <Button
            className="bg-[#ED1010]"
            size="sm"
            onClick={onDelete}
            disabled={isBusy}
            isSubmitting={isDeleting}
          >
            <Trash size={14} />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
