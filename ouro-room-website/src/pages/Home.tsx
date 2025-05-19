import { Text } from '@mantine/core'
import HomeAppShell from '../components/HomeAppShell';
import '../App.css';

export default function Home()
{
  return (
    <>
    <HomeAppShell>
      <Text className='header'>Home Page</Text>
      </HomeAppShell>
      
    </>
  );
}