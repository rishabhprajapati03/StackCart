import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { logIn } from "../../services/authService";
import { getFirebaseAuthErrorMessage } from "../../utils/getFirebaseAuthErrorMessage";

type LoginFormProps = {
  email: string;
  password: string;
};

const ForgotPassword = () => (
  <div className="mb-6">
    <p className="text-sm">
      Forgot your password?{" "}
      <Link
        to="/forgot-password"
        className="font-medium underline cursor-pointer"
      >
        Reset your password
      </Link>
    </p>
  </div>
);

const LoginPage = () => {
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm<LoginFormProps>({ mode: "onBlur" });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const showInputSuccess = isValid && isSubmitted && !authError;

  const onSubmit = async (data: LoginFormProps) => {
    setAuthError(null);
    setIsSubmitting(true);

    try {
      await logIn(data.email, data.password);

      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      const message = getFirebaseAuthErrorMessage(err);
      setAuthError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-5 flex flex-col justify-between min-h-screen">
      <div className="space-y-5 pb-6">
        {/* Header */}
        <div>
          <h2 className="text-[32px] font-semibold tracking-tighter">
            Login to your account
          </h2>
          <h4 className="text-[#808080] tracking-tight">
            It's great to see you again
          </h4>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Please enter a valid email",
              },
            })}
            error={errors.email?.message}
            success={showInputSuccess && !errors.email}
          />

          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Please enter the password",
            })}
            error={errors.password?.message}
            success={showInputSuccess && !errors.password}
          />

          {authError && (
            <p className="text-sm text-[#ED1010] my-1 p-1.5 bg-[#ED1010]/10 rounded-md">
              {authError}
            </p>
          )}

          <ForgotPassword />

          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            isSubmitting={isSubmitting}
          >
            Login
          </Button>
        </form>
      </div>

      <p className="text-center">
        Don't have an account?{" "}
        <Link to="/signup" className="underline font-medium cursor-pointer">
          Join
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
