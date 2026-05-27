// src/hooks/useMeals.ts
import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { BASE_URL } from '@env';

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  // add other fields as needed
}

/**
 * Hook to fetch meals from TheMealDB API.
 * Supports optional search query and lazy‑loading (client side pagination).
 */
export const useMeals = (initialQuery: string = '') => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const pageSize = 20; // number of items per lazy‑load chunk
  const [query, setQuery] = useState<string>(initialQuery);

  // Guard to avoid state updates after unmount
  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const fetchAll = useCallback(async (search: string) => {
    if (!isMounted.current) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/search.php?s=${encodeURIComponent(search)}`);
      const data = response.data?.meals ?? [];
      const parsed: Meal[] = data.map((m: any) => ({
        idMeal: m.idMeal,
        strMeal: m.strMeal,
        strMealThumb: m.strMealThumb,
        strCategory: m.strCategory,
        strArea: m.strArea,
        strInstructions: m.strInstructions,
      }));
      if (isMounted.current) {
        setMeals(parsed);
        setPage(1);
      }
    } catch (e: any) {
      if (isMounted.current) {
        setError(e.message || 'Failed to fetch meals');
        setMeals([]);
      }
    } finally {
      if (isMounted.current) setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchAll(query);
  }, [fetchAll, query]);

  const fetchMore = useCallback(() => {
    // Increment page to load next chunk; UI can slice based on page * pageSize
    setPage(prev => prev + 1);
  }, []);

  const refresh = useCallback(() => {
    setPage(0);
    fetchAll(query);
  }, [fetchAll, query]);

  const updateQuery = (newQuery: string) => {
    setQuery(newQuery);
    setPage(0);
    // fetchAll will run via effect when query changes
  };

  // Calculate visible meals based on current page
  const visibleMeals = meals.slice(0, page * pageSize);

  return {
    meals: visibleMeals,
    loading,
    error,
    fetchMore,
    refresh,
    updateQuery,
    totalCount: meals.length,
  };
};
