import {
  useEffect,
  useState,
} from 'react'; // eslint-disable-line no-unused-vars

const useApiCall = ({
  onSuccess = () => undefined,
  onStart = () => undefined,
  onComplete = () => undefined,
}, apiFunction) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatcher = async (args = []) => {
    setLoading(true);
    setError(null);
    onStart();

    try {
      const result = await apiFunction(...args);
      onSuccess(result);
    } catch (err) {
      console.log('err', err);
      setError(err);
    } finally {
      onComplete();
      setLoading(false);
    }
  };

  return { dispatcher, loading, error };
};

const useMountCall = ({
  onSuccess = () => undefined,
  onStart = () => undefined,
  onComplete = () => undefined,
}, apiFunction, args = []) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onStart();

    const fetch = async () => {
      try {
        const result = await apiFunction.apply(args);
        onSuccess(result);
      } catch (err) {
        setError(err);
      } finally {
        onComplete();
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { loading, error };
};

export {
  useApiCall,
  useMountCall,
};
