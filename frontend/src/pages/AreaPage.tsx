const AreaPage = () => {
	return (
		<div className="flex items-center justify-center h-screen">
			<div className="text-center">
				<h1 className="text-4xl font-bold">Home Page</h1>
				<p className="mt-4 text-lg">Bienvenue sur la page d'accueil</p>
			</div>
		</div>
	);
};

export default AreaPage;
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from "@/components/ThemeProvider"

const Home: React.FC = () => {
	const { theme, setTheme } = useTheme()
  if (theme === "dark")
	  setTheme("light")

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-10 text-center">
        <h1 className="text-5xl font-bold">Area</h1>
        <p className="mt-4 text-xl">
          Connectez vos services préférés pour automatiser vos actions en toute simplicité.
        </p>
        <Button
          className="mt-6 bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200"
          onClick={() => (window.location.href = '/login')}
        >
          Accès à l'application
        </Button>
      </header>

      <section className="py-12 px-6 text-center">
        <h2 className="text-3xl font-semibold">Comment ça marche ?</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="text-xl font-semibold">1. Connectez vos comptes</h3>
            <p className="mt-2 text-gray-600">
              Synchronisez vos comptes Google, GitHub, Discord, et plus encore.
            </p>
          </div>
          <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="text-xl font-semibold">2. Créez des actions</h3>
            <p className="mt-2 text-gray-600">
              Sélectionnez un déclencheur et choisissez une action correspondante.
            </p>
          </div>
          <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="text-xl font-semibold">3. Laissez la magie opérer</h3>
            <p className="mt-2 text-gray-600">
              Votre action se déclenche automatiquement à chaque fois que la condition est remplie.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
