import * as yup from "yup";

const passwordSchema = yup
  .string()
  .transform((value, originalValue) => originalValue === "" ? undefined : value)
  .min(8, "Password should be of minimum 8 characters length")
  .max(20, "Password should be of maximum 20 characters length")
  .matches(
    /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])/,
    "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
  );

export const editProfileValidationSchema = yup.object({
  Username: yup
    .string()
    .min(3, "Username should be at least 3 characters")
    .max(20, "Username can not be longer than 20 characters")
    .required("Username is required"),
    
  PhoneNumber: yup
    .string()
    .matches(
      /^(\+64|0)[2-9]\d{7,9}$/,
      "Phone number must begin with +64 or 0 and be between 9 and 11 digits long"
    )
    .required("Phone number is required"),

  Address: yup.string().optional(),

  Password: passwordSchema.optional(), 
});
