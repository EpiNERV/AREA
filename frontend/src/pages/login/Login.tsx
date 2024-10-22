import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { EyeOpenIcon, EyeNoneIcon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Select,  SelectTrigger,  SelectValue,  SelectContent,  SelectItem } from '@/components/ui/select';
import axios from 'axios';
import { useAuth } from '@/lib/auth/AuthContext';
import { useTheme } from '@/components/ThemeProvider';
import { useTranslation } from 'react-i18next';

interface TokenType {
  tokens: {
    access_token: string;
    refresh_token: string;
  };
}

const Login = () => {
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || '/home';

  const [errors, setErrors] = useState<{
    email?: string;
  }>({});

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
      error = t('LoginPage.emailRequired');
    } else if (!/^\S+@\S+\.\S+$/.test(value)) {
      error = t('LoginPage.emailInvalid');
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      email: error,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    validateEmail(formData.email);

    if (!errors.email) {
      try {
        setErrorMessage(null);

        const response = await axios.post<TokenType>(
          'http://localhost:5000/api/v1/user/auth/login',
          {
            email: formData.email,
            password: formData.password,
          }
        );

        const { access_token, refresh_token } = response.data.tokens;
        login(access_token, refresh_token);

        navigate(from, { replace: true });
      } catch (error) {
        console.log(error);
        setErrorMessage(
          t(
            'LoginPage.loginFailed'
          )
        );
      }
    } else {
      console.log('Le formulaire contient des erreurs.');
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
        <Select value={theme} onValueChange={setTheme}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder={t('Theme')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">{t('Light')}</SelectItem>
            <SelectItem value="dark">{t('Dark')}</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={i18n.language}
          onValueChange={(value) => handleLanguageChange(value)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder={t('Language')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">{t('English')}</SelectItem>
            <SelectItem value="fr">{t('French')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-3xl font-bold mb-2">
              {t('LoginPage.welcomeBack')} 👋
            </CardTitle>
            <CardDescription className="mb-4 text-gray-600">
              {t('LoginPage.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label htmlFor="email">{t('LoginPage.email')}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('LoginPage.enterEmail')}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="mb-4 relative">
                <Label htmlFor="password">{t('LoginPage.password')}</Label>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={t('LoginPage.enterPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-600"
                  aria-label={
                    showPassword ? t('LoginPage.hidePassword') : t('LoginPage.showPassword')
                  }
                >
                  {showPassword ? (
                    <EyeNoneIcon className="h-5 w-5" />
                  ) : (
                    <EyeOpenIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              <Button type="submit" className="w-full">
                {t('Login')}
              </Button>

              <div className="text-right mt-3">
                <a
                  href="/password_forgotten"
                  className="text-sm text-blue-500 hover:underline"
                >
                  {t('LoginPage.forgotPassword')}
                </a>
              </div>
            </form>

            {/*<div className="mt-6">*/}
            {/*  <p className="text-center text-gray-600">{t('LoginPage.orLoginWith')}</p>*/}
            {/*  <div className="flex justify-center mt-4 space-x-4">*/}
            {/*    <Button variant="outline" className="p-2 rounded-full">*/}
            {/*      <img*/}
            {/*        src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"*/}
            {/*        alt="Google"*/}
            {/*        className="h-6 w-6"*/}
            {/*      />*/}
            {/*    </Button>*/}
            {/*    <Button variant="outline" className="p-2 rounded-full">*/}
            {/*      <img*/}
            {/*        src="https://cdn-icons-png.flaticon.com/512/733/733547.png"*/}
            {/*        alt="Facebook"*/}
            {/*        className="h-6 w-6"*/}
            {/*      />*/}
            {/*    </Button>*/}
            {/*    <Button variant="outline" className="p-2 rounded-full">*/}
            {/*      <img*/}
            {/*        src="https://cdn-icons-png.flaticon.com/512/731/731985.png"*/}
            {/*        alt="Apple"*/}
            {/*        className="h-6 w-6"*/}
            {/*      />*/}
            {/*    </Button>*/}
            {/*  </div>*/}
            {/*</div>*/}

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {t('LoginPage.noAccount')}{' '}
                <a
                  href="/register"
                  className="text-blue-500 hover:underline"
                >
                  {t('LoginPage.registerNow')}
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;