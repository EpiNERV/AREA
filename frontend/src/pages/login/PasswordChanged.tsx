import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { SelectLanguageAndTheme } from "@/components/SelectLanguageAndTheme.tsx";

const PasswordChanged = () => {
  const { t } = useTranslation();

  return (
    <div className="flex h-screen">
      <SelectLanguageAndTheme/>

      <div className="w-full flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardHeader className="pt-8">
            <div className="flex justify-center mb-4">
              <CheckCircle className="text-green-500 h-16 w-16"/>
            </div>

            <CardTitle className="text-2xl font-bold mb-2">
              {t('PasswordChanged.title')}
            </CardTitle>
            <CardDescription className="mb-4 text-gray-600">
              {t('PasswordChanged.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full"
              onClick={() => (window.location.href = '/login')}
            >
              {t('PasswordChanged.backToLogin')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PasswordChanged;