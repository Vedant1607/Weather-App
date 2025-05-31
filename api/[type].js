export default async function handler(req, res) {
  const { type } = req.query;
  const { city } = req.query;

  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  if (!['weather', 'forecast'].includes(type)) {
    return res.status(400).json({ error: 'Invalid type. Use "weather" or "forecast".' });
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/${type}?q=${encodeURIComponent(city)}&appid=${process.env.API_KEY}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (err) {
    console.error('Fetch failed:', err);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}