
import { useState, useEffect, useCallback } from 'react';
import { getPokemonDetail } from '../services/pokeApi';

export default function usePokemonDetail(query) {

  const [pokemon, setPokemon] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [notFound, setNotFound] = useState(false); 
  const [retryCount, setRetryCount] = useState(0); 

 
  useEffect(() => {
    
    if (!query) {
      setPokemon(null);
      setError(null);
      setNotFound(false);
      setLoading(false);
      return;
    }

  
    const controller = new AbortController();

  
    const loadDetail = async () => {
      setLoading(true);
      setError(null);
      setNotFound(false);
      setPokemon(null);

  
      try {
        const result = await getPokemonDetail(query, controller.signal);

        if (result === null) {
          setNotFound(true); 
        } else {
          setPokemon(result);
        }
      } catch (err) {

        if (err.name === 'AbortError') return;

        setError('No pudimos cargar la ficha. Revisa tu conexión e inténtalo de nuevo.');
      } finally {
  
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadDetail();

    
    return () => controller.abort();
  }, [query, retryCount]);

  const retry = useCallback(() => {
    setRetryCount((previous) => previous + 1);
  }, []);

  return { pokemon, loading, error, notFound, retry };
}