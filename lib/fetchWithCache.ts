const CACHE_EXPIRATION_TIME = 1000 * 60 * 5; // 5 minutes

const fetchWithCache = async (key: string, url: string) => {
  const cachedData = localStorage.getItem(key);
  if (cachedData) {
    try {
      const { data, timestamp } = JSON.parse(cachedData);
      if (timestamp && Date.now() - timestamp < CACHE_EXPIRATION_TIME) {
        return data;
      }
    } catch (e) {
      console.log(e);
    }
  }

  const response = await fetch(url);
  const data = await response.json();
  localStorage.setItem(
    key,
    JSON.stringify({ data: data.data, timestamp: Date.now() }),
  );
  return data.data;
};

export default fetchWithCache;
