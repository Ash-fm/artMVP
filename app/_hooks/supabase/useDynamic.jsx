"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function useDynamic(tableName) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const supabase = createClientComponentClient();

  const fetchItems = async () => {
    const { data: fetchedItems, error: fetchError } = await supabase
      .from(tableName)
      .select("*")
      .order("updated_at", { ascending: false });

    if (fetchError) {
      console.error(`Error fetching ${tableName}:`, fetchError);
      setError(fetchError.message);
      return;
    }

    setItems(fetchedItems);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, [tableName]);

  const addItem = async (item) => {
    const { data, error: addItemError } = await supabase
      .from(tableName)
      .insert([{ label: item, order: 1 }])
      .single();

      if (addItemError) {
        setError(addItemError.message);
        return null;
      }
      return data;
  };

  const deleteItem = async (itemId) => {
    const { data, error: deleteItemError } = await supabase
      .from(tableName)
      .delete()
      .eq("id", itemId);

      if (deleteItemError) {
        setError(deleteItemError.message);
        return null;
      }
      return data;
  };

  const updateItem = async (id, updatedItem) => {
    const { data, error: updateItemError } = await supabase
      .from(tableName)
      .update({ label: updatedItem })
      .eq("id", id);

      if (updateItemError) {
        setError(updateItemError.message);
        return null;
      }
      return data;
  };

  const updateOrder = async (id, order) => {
    const { data, error: updateOrderError } = await supabase
      .from(tableName)
      .update({ order: order })
      .eq("id", id);
      if (updateOrderError) {
        setError(updateOrderError.message);
        return null;
      }
      return data;
  };

  function binarySearch(items, target, start, end) {
    if (start > end) return start;
    const mid = Math.floor((start + end) / 2);
    const midDate = new Date(items[mid].updated_at);
    if (midDate < target) return binarySearch(items, target, start, mid - 1);
    if (midDate > target) return binarySearch(items, target, mid + 1, end);
    return mid;
  }

  useEffect(() => {
    const handleItemInserted = (payload) => {
      const newItem = payload.new;
      setItems((currentItems) => {
        const insertIndex = binarySearch(
          currentItems,
          new Date(newItem.updated_at),
          0,
          currentItems.length - 1
        );
        return [
          ...currentItems.slice(0, insertIndex),
          newItem,
          ...currentItems.slice(insertIndex),
        ];
      });
    };

    const handleItemUpdated = (payload) => {
      const updatedItem = payload.new;
      setItems((currentItems) => {
        const oldItems = currentItems.filter(
          (item) => item.id !== updatedItem.id
        );
        const insertIndex = binarySearch(
          oldItems,
          new Date(updatedItem.updated_at),
          0,
          oldItems.length - 1
        );
        return [
          ...oldItems.slice(0, insertIndex),
          updatedItem,
          ...oldItems.slice(insertIndex),
        ];
      });
    };

    const handleItemDeleted = (payload) => {
      const deletedItem = payload.old;
      setItems((currentItems) => {
        return currentItems.filter((item) => item.id !== deletedItem.id);
      });
    };

    const itemsSub = supabase
      .channel("any")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: tableName },
        (payload) => handleItemInserted(payload)
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: tableName },
        (payload) => handleItemDeleted(payload)
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: tableName },
        (payload) => handleItemUpdated(payload)
      )
      .subscribe();

    return () => {
      supabase.removeChannel(itemsSub);
    };
  }, [supabase, tableName]);

  return { items, isLoading, error, addItem, deleteItem, updateItem, updateOrder };
}
