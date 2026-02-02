import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { FirebaseError } from "firebase/app";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { resetPassword } from "../../services/authService";

type FormData = {
  email: string;
};

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [serverErr, setServerErr] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<FormData>({ mode: "onBlur" });

  const onFormSubmit = async ({ email }: FormData) => {
    setServerErr(null);

    try {
      await resetPassword(email);

      toast.success("Password reset email sent");
      setTimeout(() => navigate("/login"), 300);
    } catch (err) {
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/invalid-email":
            setServerErr("Please enter a valid email address");
            break;
          case "auth/user-not-found":
            setServerErr("No account found with this email");
            break;
          default:
            setServerErr("Failed to send reset email. Try again.");
        }
      } else {
        setServerErr("Something went wrong");
      }
    }
  };

  const isBtnEnabled = touchedFields.email && !errors.email;
  const showSuccess = touchedFields.email && !errors.email && !serverErr;

  return (
    <div className="px-5">
      {/* Header */}
      <header className="h-15 flex items-center w-full">
        <button onClick={() => navigate("/login")}>
          <ArrowLeft className="h-6 w-6" />
        </button>
      </header>

      {/* Content */}
      <div className="gap-2 mb-5">
        <h2 className="text-[32px] font-semibold tracking-tight">
          Forgot Password
        </h2>
        <p className="text-base text-[#808080]">
          Enter your email. We’ll send you a reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        <Input
          type="email"
          placeholder="Enter your email address"
          autoComplete="email"
          autoFocus
          disabled={isSubmitting}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Please enter a valid email",
            },
          })}
          error={errors.email?.message}
          success={showSuccess}
        />

        {serverErr && (
          <p className="text-sm text-[#ED1010] my-4 p-2 bg-[#ED1010]/10 rounded-md">
            {serverErr}
          </p>
        )}

        <Button
          type="submit"
          disabled={!isBtnEnabled || isSubmitting}
          isSubmitting={isSubmitting}
        >
          Send Reset Link
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
