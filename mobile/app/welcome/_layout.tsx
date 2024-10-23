import MainLayout from '@/components/MainLayout';

export default function HomeLayout() {
  const routes = [
    { name: 'login', options: { title: 'Login' } },
    { name: 'register', options: { title: 'Register' } },
  ];

  return <MainLayout routes={routes} />;
}
