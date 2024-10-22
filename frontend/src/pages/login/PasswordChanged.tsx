import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { CheckCircle } from 'lucide-react';

const PasswordChanged = () => {
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();

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

      <div className="w-full flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardHeader className="pt-8">
            <div className="flex justify-center mb-4">
              <CheckCircle className="text-green-500 h-16 w-16" />
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