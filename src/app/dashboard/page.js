import { DashboardView } from '@/components/DashboardView';
import { Navbar } from './../../components/Navbar';
import { CustomerList } from '@/components/CustomerList';

export default function Home() {
  return (
    <div>
      {/* <p>Dashboard...</p> */}
      <Navbar/>
      <DashboardView/>
      <CustomerList/>
    </div>
  );
}
