import LendItemForm from '../components/LendItemForm';

export default function LendPage() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (!user) return <div>Please sign in.</div>;
  return (
    <div className="container mx-auto py-8">
      <LendItemForm user={user} />
    </div>
  );
} 