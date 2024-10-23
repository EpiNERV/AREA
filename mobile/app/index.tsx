import { Redirect } from 'expo-router';

export default function Index() {

//   const { loading, accessToken } = useAuth();

//   if (!loading) {
    return (
      <Redirect href={"/welcome"} />
    );
//   }
}
