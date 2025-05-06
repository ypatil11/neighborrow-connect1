import { supabase } from './supabaseClient';

// USERS
export async function getUserProfile(id) {
  return supabase.from('Users').select('*').eq('id', id).single();
}
export async function createUserProfile({ id, email, name, location }) {
  return supabase.from('Users').insert([{ id, email, name, location }]);
}

// LENDED ITEMS
export async function createLendedItem(item) {
  return supabase.from('LendedItems').insert([item]);
}
export async function getLendedItemsByLocation(location, excludeUserId) {
  return supabase
    .from('LendedItems')
    .select('*')
    .eq('location', location)
    .neq('user_id', excludeUserId)
    .eq('is_available', true);
}
export async function getLendedItemsByUser(user_id) {
  return supabase.from('LendedItems').select('*').eq('user_id', user_id);
}

// BORROWED ITEMS
export async function createBorrowRequest(request) {
  return supabase.from('BorrowedItems').insert([request]);
}
export async function getBorrowedItemsByUser(borrower_id) {
  return supabase.from('BorrowedItems').select('*').eq('borrower_id', borrower_id);
}
export async function updateBorrowRequestStatus(id, status) {
  return supabase.from('BorrowedItems').update({ status }).eq('id', id);
} 