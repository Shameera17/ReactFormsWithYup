import { FC } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const FormCon: FC = () => {
  const onSubmit = (e: any) => {
    console.log("Hello world", e);
  };

  const schema = yup.object().shape({
    fullName: yup.string().required("Full name is required"),
    email: yup.string().email().required("Email is required"),
    age: yup.number().positive().integer().min(18).required("Age is required"),
    password: yup.string().required("Password is required").min(4).max(20),
    confPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Password dont match")
  });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  return (
    <form
      style={{ display: "flex", flexDirection: "column", width: "50%" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input type="text" placeholder="Full Name..." {...register("fullName")} />
      {errors?.fullName?.message && (
        <p className="warning">{errors?.fullName?.message.toString()}</p>
      )}
      <input type="text" {...register("email")} placeholder="Email..." />
      {errors?.email?.message && (
        <p className="warning">{errors?.email?.message.toString() ?? ""}</p>
      )}
      <input
        value={0}
        type="number"
        {...register("age")}
        placeholder="Age..."
      />
      {errors?.age?.message && (
        <p className="warning">{errors?.age?.message.toString() ?? ""}</p>
      )}
      <input
        type="password"
        {...register("password")}
        placeholder="Password..."
      />
      {errors?.password?.message && (
        <p className="warning">{errors?.password?.message.toString() ?? ""}</p>
      )}
      <input
        type="password"
        {...register("confPassword")}
        placeholder="Confirm Password..."
      />
      {errors?.confPassword?.message && (
        <p className="warning">
          {errors?.confPassword?.message.toString() ?? ""}
        </p>
      )}
      <input type="submit" placeholder="" />
    </form>
  );
};

export default FormCon;
