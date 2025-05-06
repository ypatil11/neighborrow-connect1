import { createBorrowRequest, updateBorrowRequestStatus } from '../supabase/supabaseService';

export async function handleCreateBorrowRequest(request) {
  const { data, error } = await createBorrowRequest(request);
  if (error) {
    console.error('Error creating borrow request:', error);
    return null;
  }
  return data;
}

export async function handleUpdateBorrowRequestStatus(id, status) {
  const { data, error } = await updateBorrowRequestStatus(id, status);
  if (error) {
    console.error('Error updating borrow request status:', error);
    return null;
  }
  return data;
} 