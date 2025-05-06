import BorrowedItemsPage from '../components/BorrowedItemsPage';

export default function BorrowedItems() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (!user) return <div>Please sign in.</div>;
  return (
    <div className="container mx-auto py-8">
      <BorrowedItemsPage user={user} />
    </div>
  );
} 