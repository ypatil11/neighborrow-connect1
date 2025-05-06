import BorrowList from '../components/BorrowList';
import { useAuth } from '../supabase/supabaseClient';

export default function BorrowPage() {
  // Replace with your actual auth logic
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (!user) return <div>Please sign in.</div>;
  return (
    <div className="container mx-auto py-8">
      <BorrowList user={user} />
    </div>
  );
} 