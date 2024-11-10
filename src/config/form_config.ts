import { FormField } from "@/core/types/form_props";
import { faEnvelope, faFingerprint } from "@fortawesome/free-solid-svg-icons";
import { z } from "zod";

const loginFormConfig: FormField[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    icon: faEnvelope,
    validation: z
      .string()
      .email("Invalid email format")
      .nonempty("Email is required"),
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    icon: faFingerprint,
    validation: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .nonempty("Password is required"),
  },
];

export { loginFormConfig };
