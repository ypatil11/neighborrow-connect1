export default function Profile({ user }) {
  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-2">Profile</h2>
      <div><strong>Name:</strong> {user.name}</div>
      <div><strong>Email:</strong> {user.email}</div>
      <div><strong>Location:</strong> {user.location}</div>
    </div>
  );
} 