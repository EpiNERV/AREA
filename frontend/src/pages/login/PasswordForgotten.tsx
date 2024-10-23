import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { SelectLanguageAndTheme } from "@/components/SelectLanguageAndTheme.tsx";

function PasswordForgotten() {
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      <SelectLanguageAndTheme/>

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