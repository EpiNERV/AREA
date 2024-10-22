import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useTheme } from '@/components/ThemeProvider';
import { useTranslation } from 'react-i18next';

function PasswordForgotten() {
  const { themeMode, setThemeMode } = useTheme();
  const { t, i18n } = useTranslation();

  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage(t('PasswordForgotten.emailRequired'));
      return;
    }

    console.log('Envoi du code de réinitialisation à :', email);
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
            <CardTitle className="text-2xl font-bold mb-2">
              {t('PasswordForgotten.title')}
            </CardTitle>
            <CardDescription className="mb-4 text-gray-600">
              {t('PasswordForgotten.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label htmlFor="email">{t('PasswordForgotten.enterEmail')}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t('PasswordForgotten.emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2"
                />
              </div>

              <Button type="submit" className="w-full">
                {t('PasswordForgotten.sendCode')}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                {t('PasswordForgotten.rememberPassword')}{' '}
                <a href="/login" className="text-blue-500 hover:underline">
                  {t('PasswordForgotten.login')}
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PasswordForgotten;