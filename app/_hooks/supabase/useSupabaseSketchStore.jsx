import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';



const useSupabaseSketchStore = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const supabase = createClientComponentClient();
  const tableName = 'transactions'

  const fetchTransactions = async (tableName) => {
    try {
      const { data: fetchedTransactions, error: fetchError } = await supabase
        .from(tableName)
        .select('*')
        .order('txNumber', { ascending: true });

      if (fetchError) {
        console.error(`Error fetching ${tableName}:`, fetchError);
        setError(fetchError.message);
      } else {
        setTransactions(fetchedTransactions);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error.message);
      setError(error.message);
    }
  };

  const subscribeToChanges = (tableName) => {
    const handleTransactionInserted = (payload) => {
      const newTransaction = payload.new;
      setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
    };

    const handleTransactionUpdated = (payload) => {
      const updatedTransaction = payload.new;
      setTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction.txid === updatedTransaction.txid ? updatedTransaction : transaction
        )
      );
    };

    const handleTransactionDeleted = (payload) => {
      const deletedTransaction = payload.old;
      setTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction.txid !== deletedTransaction.txid)
      );
    };

    const transactionsSub = supabase
      .channel('any')
      .on('INSERT', handleTransactionInserted)
      .on('UPDATE', handleTransactionUpdated)
      .on('DELETE', handleTransactionDeleted)
      .subscribe();

    return () => {
      supabase.removeChannel(transactionsSub);
    };
  };

  return { transactions, isLoading, error, fetchTransactions, subscribeToChanges };
};

export default useSupabaseSketchStore;
