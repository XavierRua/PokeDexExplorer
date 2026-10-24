import { useState, useEffect, useCallback, useRef } from 'react';
import { getPokemonList } from '../services/pokeApi';

export default function usePokemonList() {
  
  const [pokemonList, setPokemonList] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [loadingMore, setLoadingMore] = useState(false); 
  const [error, setError] = useState(null); 
  const [hasMore, setHasMore] = useState(true);

  
  const offsetRef = useRef(0); 
  const isFetchingRef = useRef(false); 
  const controllerRef = useRef(null); 


  const fetchPage = useCallback(async () => {
    
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    const isFirstPage = offsetRef.current === 0;
    if (isFirstPage) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    setError(null);

   
    const controller = new AbortController();
    controllerRef.current = controller;

  
    try {
      const { items, hasMore: morePages } = await getPokemonList(offsetRef.current, controller.signal);

     
      setPokemonList((previous) => [...previous, ...items]);
      offsetRef.current += items.length;
      setHasMore(morePages);
    } catch (err) {
      
      if (err.name === 'AbortError') return;

      setError('No pudimos cargar los Pokémon. Revisa tu conexión e inténtalo de nuevo.');
    } finally {

      if (controllerRef.current === controller) {
        isFetchingRef.current = false;
        setLoading(false);
        setLoadingMore(false);
      }
    }
  }, []);

 
  useEffect(() => {
    fetchPage();

   
    return () => {
      controllerRef.current?.abort();
      controllerRef.current = null;
      isFetchingRef.current = false;
    };
  }, [fetchPage]);


  const loadMore = useCallback(() => {
    
    if (!hasMore || error) return;
    fetchPage();
  }, [hasMore, error, fetchPage]);


  const retry = useCallback(() => {
    fetchPage();
  }, [fetchPage]);

  return { pokemonList, loading, loadingMore, error, hasMore, loadMore, retry };
}