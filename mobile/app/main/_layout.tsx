import MainLayout from '@/components/MainLayout';

export default function HomeLayout() {
  const routes = [
    { name: 'index', options: { title: 'Home' } },
  ];

  return <MainLayout routes={routes} />;
}
