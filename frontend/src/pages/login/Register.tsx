import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CheckIcon, Cross1Icon, EyeOpenIcon, EyeNoneIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import { useTheme } from '@/components/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const PasswordCriteria = ({ label, isValid }: { label: string; isValid: boolean }) => (
  <div className="flex items-center">
    {isValid ? (
      <CheckIcon className="text-green-500 mr-2" />
    ) : (
      <Cross1Icon className="text-red-500 mr-2" />
    )}
    <span className={isValid ? 'text-green-500' : 'text-red-500'}>{label}</span>
  </div>
);

const Register = () => {
  const { themeMode, setThemeMode } = useTheme();
  const { t, i18n } = useTranslation();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    passwordMatch: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPasswordCriteria, setShowPasswordCriteria] = useState(false);

  const navigate = useNavigate();

  const passwordCriteria = {
    minLength: formData.password.length >= 8,
    hasUppercase: /[A-Z]/.test(formData.password),
    hasLowercase: /[a-z]/.test(formData.password),
    hasNumber: /\d/.test(formData.password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
  };

  const isPasswordComplex = Object.values(passwordCriteria).every(Boolean);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [name]: value };

      if (name === 'email') {
        validateEmail(value);
      }

      if (name === 'password' || name === 'confirmPassword') {
        validatePasswords(
          name === 'password' ? value : updatedFormData.password,
          name === 'confirmPassword' ? value : updatedFormData.confirmPassword
        );
      }

      return updatedFormData;
    });
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: t('RegisterPage.emailInvalid'),
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
    }
  };

  const validatePasswords = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordMatch: t('RegisterPage.passwordsNotMatch'),
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, passwordMatch: '' }));
    }
  };

  const handlePasswordBlur = () => {
    if (formData.password && !isPasswordComplex) {
      setShowPasswordCriteria(true);
    } else {
      setShowPasswordCriteria(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!errors.email && !errors.passwordMatch && isPasswordComplex) {
      try {
        await axios.post('http://localhost:5000/api/v1/user/auth/register', {
          email: formData.email,
          password: formData.password,
          username: formData.username,
        });

        navigate('/login', { replace: true });
      } catch (error: any) {
        setErrorMessage(error.response.data.message);
      }
    } else {
      console.log('Error in form.');
    }
  };

  const handleLanguageChange = (language: string) => {
    i18n
      .changeLanguage(language)
      .then(() => {
        localStorage.setItem('language', language);
      })
      .catch((error) => {
        console.error('Failed to change language:', error);
      });
  };

  return (
    <div className="flex h-screen">
      <div className="absolute top-4 right-4 flex space-x-4">
        <Select value={themeMode} onValueChange={setThemeMode}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder={t('Accessibility.Theme')}/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">{t('Accessibility.Light')}</SelectItem>
            <SelectItem value="dark">{t('Accessibility.Dark')}</SelectItem>
            <SelectItem value="system">{t('Accessibility.System')}</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={i18n.language}
          onValueChange={(value) => handleLanguageChange(value)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder={t('Accessibility.Language')}/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">{t('Accessibility.English')}</SelectItem>
            <SelectItem value="fr">{t('Accessibility.French')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-3xl font-bold mb-4">{t('RegisterPage.welcome')}</CardTitle>
            <CardDescription className="mb-6 text-gray-600">
              {t('RegisterPage.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label htmlFor="username">{t('RegisterPage.username')}</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder={t('RegisterPage.enterUsername')}
                  className="mt-2 w-full"
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="email">{t('RegisterPage.email')}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('RegisterPage.enterEmail')}
                  className="mt-2 w-full"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="mb-4 relative">
                <Label htmlFor="password">{t('RegisterPage.password')}</Label>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handlePasswordBlur}
                  placeholder={t('RegisterPage.enterPassword')}
                  className="mt-2 w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-600"
                  aria-label={showPassword ? t('RegisterPage.hidePassword') : t('RegisterPage.showPassword')}
                >
                  {showPassword ? (
                    <EyeNoneIcon className="h-5 w-5" />
                  ) : (
                    <EyeOpenIcon className="h-5 w-5" />
                  )}
                </button>

                {showPasswordCriteria && (
                  <div className="mt-2">
                    {!passwordCriteria.minLength && (
                      <PasswordCriteria
                        label={t('RegisterPage.criteria.minLength')}
                        isValid={passwordCriteria.minLength}
                      />
                    )}
                    {!passwordCriteria.hasUppercase && (
                      <PasswordCriteria
                        label={t('RegisterPage.criteria.uppercase')}
                        isValid={passwordCriteria.hasUppercase}
                      />
                    )}
                    {!passwordCriteria.hasLowercase && (
                      <PasswordCriteria
                        label={t('RegisterPage.criteria.lowercase')}
                        isValid={passwordCriteria.hasLowercase}
                      />
                    )}
                    {!passwordCriteria.hasNumber && (
                      <PasswordCriteria
                        label={t('RegisterPage.criteria.number')}
                        isValid={passwordCriteria.hasNumber}
                      />
                    )}
                    {!passwordCriteria.hasSpecialChar && (
                      <PasswordCriteria
                        label={t('RegisterPage.criteria.specialChar')}
                        isValid={passwordCriteria.hasSpecialChar}
                      />
                    )}
                  </div>
                )}
              </div>

              <div className="mb-4 relative">
                <Label htmlFor="confirmPassword">{t('RegisterPage.confirmPassword')}</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder={t('RegisterPage.confirmYourPassword')}
                  className="mt-2 w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-9 text-gray-600"
                  aria-label={showConfirmPassword ? t('RegisterPage.hideConfirmPassword') : t('RegisterPage.showConfirmPassword')}
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
                className={`w-full ${
                  !errors.email && !errors.passwordMatch && isPasswordComplex
                    ? ''
                    : 'opacity-50 cursor-not-allowed'
                }`}
                disabled={!!errors.email || !!errors.passwordMatch || !isPasswordComplex}
              >
                {t('RegisterPage.agreeAndRegister')}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {t('RegisterPage.alreadyHaveAccount')}{' '}
                <a href="/login" className="text-blue-500 hover:underline">
                  {t('RegisterPage.login')}
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;