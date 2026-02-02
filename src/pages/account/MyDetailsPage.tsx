import { useForm } from "react-hook-form";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

type MyDetailsFormType = {
  fullname: string;
  email: string;
  dob: Date;
  gender: "Male" | "Female";
  phone: number;
};

const MyDetailsPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<MyDetailsFormType>();
  const onFormSubmit = () => {
    console.log("FORM Submitted");
  };
  return (
    <div className="">
      <hr className="text-[#E6E6E6] mb-6" />
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        <Input
          type="text"
          {...register("fullname", { required: "Please enter your name" })}
          label="Full Name"
          placeholder="Enter your name"
          error={errors.fullname?.message}
          success={isValid}
        />
        <Input
          type="email"
          {...register("email", { required: "Email is Required" })}
          label="Email Address"
          placeholder="Enter your email"
          error={errors.email?.message}
          success={isValid}
        />
        <Input
          type="date"
          {...register("dob", { required: "Please select your date of birth" })}
          label="Date of Birth"
          error={errors.dob?.message}
        />
        <div className="space-y-2">
          <label htmlFor="Gender" className="font-medium">
            Select Gender
          </label>
          <select
            className="w-full mt-1.5 border border-[#E6E6E6]  px-3  py-4 rounded-[10px]"
            {...register("gender", { required: "Select your gender" })}
          >
            <option value={"Male"}>Male</option>
            <option value={"Female"}>Female</option>
          </select>
          {errors.gender?.message && (
            <p className="text-xs text-[#ED1010]">{errors.gender?.message}</p>
          )}
        </div>
        <Input
          type="number"
          {...register("phone", {
            required: "Please enter your phone number",
            minLength: {
              value: 10,
              message: "Please enter valid phone number",
            },
          })}
          label="Phone Number"
          placeholder="Enter your phone number"
          error={errors.phone?.message}
          success={isValid}
        />
        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default MyDetailsPage;
