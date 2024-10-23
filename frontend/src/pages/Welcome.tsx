import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SelectLanguageAndTheme } from "@/components/SelectLanguageAndTheme.tsx";
l
const Welcome: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <SelectLanguageAndTheme/>

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Area</h1>
        <p className="mt-4 text-lg">
          {t('Welcome.description')}
        </p>
        <Button
          className="mt-6"
          onClick={() => (window.location.href = '/login')}
        >
          {t('Welcome.accessApp')}
        </Button>
      </div>

      <section className="w-full max-w-5xl text-center">
        <h2 className="text-2xl font-semibold">{t('Welcome.howItWorks')}</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('Welcome.step1.title')}</CardTitle>
              <CardDescription>{t('Welcome.step1.description')}</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('Welcome.step2.title')}</CardTitle>
              <CardDescription>{t('Welcome.step2.description')}</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('Welcome.step3.title')}</CardTitle>
              <CardDescription>{t('Welcome.step3.description')}</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Welcome;