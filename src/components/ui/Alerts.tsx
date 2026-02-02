import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import Button from "./Button";

const MySwal = withReactContent(Swal);

interface AlertOptions {
  title: string;
  message: string;
  confirmText: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

// Success Alert
export const showSuccessAlert = ({
  title,
  message,
  confirmText,
  onConfirm,
}: AlertOptions) => {
  MySwal.fire({
    title: <h2 className="text-3xl font-bold tracking-tight mt-6">{title}</h2>,
    html: <p className="text-[#808080] text-lg">{message}</p>,
    icon: "success",
    iconHtml: (
      <CheckCircle2
        size={80}
        className="stroke-[#22A447] fill-[#22A447]/20"
        strokeWidth={1.5}
      />
    ),
    showConfirmButton: false,
    customClass: {
      popup: "rounded-[32px] p-8 m-6 w-full max-w-[400px]",
      icon: "border-none bg-transparent m-0 p-0 flex items-center justify-center overflow-visible",
    },
    footer: (
      <div className="w-full px-4 mb-4">
        <Button
          variant="primary"
          className="w-full py-5 text-lg font-bold bg-black rounded-2xl"
          onClick={() => {
            MySwal.close();
            onConfirm?.();
          }}
        >
          {confirmText}
        </Button>
      </div>
    ),
  });
};

// Destructive Alert
export const showDestructiveAlert = ({
  title,
  message,
  confirmText,
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: AlertOptions) => {
  MySwal.fire({
    title: <h2 className="text-2xl font-bold mt-6">{title}</h2>,
    html: <p className="text-[#808080] text-base">{message}</p>,
    icon: "warning",
    // Custom Red Warning Icon
    iconHtml: (
      <AlertTriangle
        size={60}
        className="stroke-[#ED1010] fill-[#ED1010]/10"
        strokeWidth={2}
      />
    ),
    showConfirmButton: false,
    showCancelButton: false,
    customClass: {
      popup: "rounded-[24px] p-6 m-6 w-full max-w-[380px]",
      icon: "border-none bg-transparent m-0 p-0 flex items-center justify-center overflow-visible",
    },
    footer: (
      <div className="w-full flex flex-col gap-3 px-2 mb-2">
        <Button
          variant="primary"
          className="w-full bg-[#ED1010] hover:bg-red-700 text-white rounded-xl py-4"
          onClick={() => {
            MySwal.close();
            onConfirm?.();
          }}
        >
          {confirmText}
        </Button>
        <Button
          variant="secondary" // Using your secondary variant here
          className="w-full rounded-xl py-4"
          onClick={() => {
            MySwal.close();
            onCancel?.();
          }}
        >
          {cancelText}
        </Button>
      </div>
    ),
  });
};
