import { useState } from 'react';
import { supabase } from '../supabase/supabaseClient';
import { createUserProfile } from '../supabase/supabaseService';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      return;
    }

    // Create user profile in the Users table
    const { error: profileError } = await createUserProfile({
      id: authData.user.id,
      email,
      name,
      location
    });

    if (profileError) {
      setError(profileError.message);
      return;
    }

    window.location.reload();
  };

  return (
    <form onSubmit={handleSignup}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Sign Up</button>
      {error && <div>{error}</div>}
    </form>
  );
}