import { createLendedItem, getLendedItemsByLocation } from '../supabase/supabaseService';

export async function handleCreateLendedItem(item) {
  const { data, error } = await createLendedItem(item);
  if (error) {
    console.error('Error creating lended item:', error);
    return null;
  }
  return data;
}

export async function handleGetLendedItems(location, excludeUserId) {
  const { data, error } = await getLendedItemsByLocation(location, excludeUserId);
  if (error) {
    console.error('Error fetching lended items:', error);
    return [];
  }
  return data;
} 