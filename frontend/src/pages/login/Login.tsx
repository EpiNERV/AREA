import React, { useState } from 'react';
import { EyeOpenIcon, EyeNoneIcon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import deco from '/icons/utils/login.png';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<{
    email?: string;
  }>({});

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'email') {
      validateEmail(value);
    }
  };

  const validateEmail = (value: string) => {
    let error = '';

    if (!value) {
      error = 'Veuillez entrer votre adresse email.';
    } else if (!/^\S+@\S+\.\S+$/.test(value)) {
      error = 'Veuillez entrer une adresse email valide.';
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      email: error,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    validateEmail(formData.email);

    if (!errors.email) {
      console.log('Formulaire valide. Soumission en cours...', formData);
    } else {
      console.log('Le formulaire contient des erreurs.');
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col justify-center pl-20 pr-10">
        <div className="max-w-md p-6 rounded-md shadow-lg bg-white">
          <h1 className="text-3xl font-bold mb-6">Welcome Back 👋</h1>
          <p className="mb-6 text-gray-600">Action REAction.</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`mt-1 w-full placeholder-gray-400 ${
                  errors.email ? 'border-red-500' : ''
                }`}
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
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="mt-1 w-full placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-600"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeNoneIcon className="h-5 w-5" />
                ) : (
                  <EyeOpenIcon className="h-5 w-5" />
                )}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              Login
            </Button>

            <div className="text-right mt-3">
              <a href="/password_forgotten" className="text-sm text-blue-500 hover:underline">
                Forgot Password?
              </a>
            </div>
          </form>

          <div className="mt-6">
            <p className="text-center text-gray-600">Or Login with</p>
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

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don’t have an account?{' '}
              <a href="/register" className="text-blue-500 hover:underline">
                Register Now
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="w-1/2">
        <img
          src={deco}
          alt="Decorative"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
