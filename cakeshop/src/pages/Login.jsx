import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";


const Login = () => {
  const useAuth = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <Formik
      initialValues={initialLoginValues}
      validationSchema={loginValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="mx-auto mt-10 max-w-[300px] px-3 text-sm font-semibold text-gray-500 sm:max-w-[400px]">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="Email">Your Email*</label>
              <Field name="Email" className={className} />
              <ErrorMessage
                name="Email"
                component="div"
                className="text-xs font-normal text-red-500"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="PasswordHash">Password*</label>
              <Field
                name="PasswordHash"
                type="password"
                className={className}
              />
              <ErrorMessage
                name="PasswordHash"
                component="div"
                className="text-xs font-normal text-red-500"
              />
              {errorMessage && (
                <div className="text-xs font-normal text-red-500">
                  {errorMessage}
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 h-8 rounded-sm bg-amber-500 text-white transition-all duration-200 hover:cursor-pointer hover:bg-amber-600"
            >
              {isSubmitting ? "Loading..." : "Login"}
            </button>
            <Link
              className="text-center font-normal text-blue-500 hover:text-blue-600"
              to="/register"
            >
              Don&apos;t have an account? Sign up
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default Login;
