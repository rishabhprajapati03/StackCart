import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { signUp } from "../../services/authService";
import { getFirebaseAuthErrorMessage } from "../../utils/getFirebaseAuthErrorMessage";

const TermsAndConditions = () => (
  <p className="text-sm mb-6">
    By signing up you agree to our{" "}
    <span className="font-medium underline">Terms</span>,{" "}
    <span className="font-medium underline">Privacy Policy</span>, and{" "}
    <span className="font-medium underline">Cookie Use</span>
  </p>
);

type FormData = {
  fullName: string;
  email: string;
  password: string;
};

const SignUpPage = () => {
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm<FormData>({ mode: "onBlur" });

  const showInputSuccess = isValid && isSubmitted && !authError;

  const onSubmit = async (data: FormData) => {
    setAuthError(null);
    setIsSubmitting(true);

    try {
      await signUp(data.email, data.password, data.fullName);

      toast.success("Account created successfully");
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
            Create an account
          </h2>
          <h4 className="text-[#808080] tracking-tight">
            Let's create your account
          </h4>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Input
            type="text"
            label="Full Name"
            placeholder="Enter your full name"
            {...register("fullName", {
              required: "Enter your full name",
              minLength: {
                value: 2,
                message: "Please enter more than 2 letters",
              },
            })}
            error={errors.fullName?.message}
            success={showInputSuccess && !errors.fullName}
          />

          <Input
            type="email"
            label="Email"
            placeholder="Enter your email address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Enter a valid email",
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
              required: "Enter the password",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            })}
            error={errors.password?.message}
            success={showInputSuccess && !errors.password}
          />

          {authError && (
            <p className="text-sm text-[#ED1010] my-1 p-1.5 bg-[#ED1010]/10 rounded-md">
              {authError}
            </p>
          )}

          <TermsAndConditions />

          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            isSubmitting={isSubmitting}
          >
            Create Your Account
          </Button>
        </form>
      </div>

      <p className="text-center">
        Already have an account?{" "}
        <Link to="/login" className="underline font-medium">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
