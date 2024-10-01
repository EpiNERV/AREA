import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CheckIcon, Cross1Icon, EyeOpenIcon, EyeNoneIcon } from "@radix-ui/react-icons";

const PasswordCriteria = ({ label, isValid }: { label: string; isValid: boolean }) => (
  <div className="flex items-center">
    {isValid ? (
      <CheckIcon className="text-green-500 mr-2" />
    ) : (
      <Cross1Icon className="text-red-500 mr-2" />
    )}
    <span className={`${isValid ? "text-green-500" : "text-red-500"}`}>{label}</span>
  </div>
);

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    passwordMatch: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordCriteria = {
    minLength: formData.password.length >= 8,
    hasUppercase: /[A-Z]/.test(formData.password),
    hasLowercase: /[a-z]/.test(formData.password),
    hasNumber: /[0-9]/.test(formData.password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
  };

  const isPasswordComplex = Object.values(passwordCriteria).every(Boolean);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      validateEmail(value);
    }
    if (name === "confirmPassword" || name === "password") {
      validatePasswords(formData.password, value);
    }
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  };

  const validatePasswords = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordMatch: "Passwords do not match.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, passwordMatch: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!errors.email && !errors.passwordMatch && isPasswordComplex) {
      console.log("Form is valid. Submitting...");
    } else {
      console.log("Form contains errors.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Welcome 👋</h1>
        <p className="text-gray-600 mb-6">
          Register to start creating and managing your projects.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="mt-2 w-full"
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-2 w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4 relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="mt-2 w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeNoneIcon className="h-5 w-5" />
              ) : (
                <EyeOpenIcon className="h-5 w-5" />
              )}
            </button>

            <div className="mt-2">
              <PasswordCriteria label="At least 8 characters" isValid={passwordCriteria.minLength} />
              <PasswordCriteria label="At least one uppercase letter" isValid={passwordCriteria.hasUppercase} />
              <PasswordCriteria label="At least one lowercase letter" isValid={passwordCriteria.hasLowercase} />
              <PasswordCriteria label="At least one number" isValid={passwordCriteria.hasNumber} />
              <PasswordCriteria label="At least one special character" isValid={passwordCriteria.hasSpecialChar} />
            </div>
          </div>

          <div className="mb-4 relative">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="mt-2 w-full"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-gray-600"
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirmPassword ? (
                <EyeNoneIcon className="h-5 w-5" />
              ) : (
                <EyeOpenIcon className="h-5 w-5" />
              )}
            </button>
            {errors.passwordMatch && (
              <p className="text-red-500 text-sm mt-1">{errors.passwordMatch}</p>
            )}
          </div>

          <Button
            type="submit"
            className={`w-full text-white ${
              !errors.email && !errors.passwordMatch && isPasswordComplex
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-600 cursor-not-allowed"
            }`}
            disabled={!!errors.email || !!errors.passwordMatch || !isPasswordComplex}
          >
            Agree and Register
          </Button>

          <div className="mt-6">
            <p className="text-center text-gray-600">Or Register with</p>
            <div className="flex justify-center mt-4 space-x-4">
              <button className="bg-gray-200 p-2 rounded-full">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                  alt="Google"
                  className="h-6 w-6"
                />
              </button>
              <button className="bg-gray-200 p-2 rounded-full">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                  alt="Facebook"
                  className="h-6 w-6"
                />
              </button>
              <button className="bg-gray-200 p-2 rounded-full">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/731/731985.png"
                  alt="Apple"
                  className="h-6 w-6"
                />
              </button>
            </div>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
