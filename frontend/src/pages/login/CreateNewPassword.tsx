import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { EyeOpenIcon, EyeNoneIcon, CheckIcon, Cross1Icon } from '@radix-ui/react-icons';

const PasswordCriteria = ({ label, isValid }: { label: string; isValid: boolean }) => (
  <div className="flex items-center">
    {isValid ? (
      <CheckIcon className="text-green-500 mr-2" />
    ) : (
      <Cross1Icon className="text-red-500 mr-2" />
    )}
    <span className={`${isValid ? 'text-green-500' : 'text-red-500'}`}>{label}</span>
  </div>
);

const CreateNewPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    passwordMatch: '',
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordCriteria = {
    minLength: formData.newPassword.length >= 8,
    hasUppercase: /[A-Z]/.test(formData.newPassword),
    hasLowercase: /[a-z]/.test(formData.newPassword),
	hasNumber: /\d/.test(formData.newPassword),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword),
  };

  const isPasswordComplex = Object.values(passwordCriteria).every(Boolean);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'confirmPassword') {
      validatePasswords(formData.newPassword, value);
    }
  };

  const validatePasswords = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      setErrors({ passwordMatch: 'Passwords do not match.' });
    } else {
      setErrors({ passwordMatch: '' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validatePasswords(formData.newPassword, formData.confirmPassword);
    if (!errors.passwordMatch && isPasswordComplex) {
      console.log('Form is valid. Submitting...', formData);
    } else {
      console.log('Form contains errors.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Create New Password</h1>
        <p className="text-gray-600 mb-6">
          Your new password must be unique from those previously used.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type={showNewPassword ? 'text' : 'password'}
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter your new password"
              className="mt-2 w-full"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-9 text-gray-600"
              aria-label={showNewPassword ? 'Hide new password' : 'Show new password'}
            >
              {showNewPassword ? (
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
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="mt-2 w-full"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-gray-600"
              aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
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
              !errors.passwordMatch && isPasswordComplex
                ? 'bg-blue-500 hover:bg-blue-600'
                : 'bg-gray-600 cursor-not-allowed'
            }`}
            disabled={!!errors.passwordMatch || !isPasswordComplex}
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewPassword;
