// pages/api/f1data.js (FETCHES MULTIPLE SEASONS)
import axios from 'axios';

const JOLPICA_BASE = 'https://api.jolpi.ca/ergast/f1';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const currentYear = 2024;
    const startYear = 2015; // 10 years of data
    console.log(`Fetching F1 data from ${startYear} to ${currentYear}...`);

    // Fetch standings for multiple years in parallel
    const yearPromises = [];
    for (let year = startYear; year <= currentYear; year++) {
      yearPromises.push(
        axios.get(`${JOLPICA_BASE}/${year}/constructorstandings.json`, {
          timeout: 15000,
        })
      );
    }

    const responses = await Promise.all(yearPromises);

    // Combine all years into one big standings list with year info
    let allStandings = [];
    responses.forEach((response, idx) => {
      const year = startYear + idx;
      const yearStandings =
        response?.data?.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings || [];
      
      // Add year info to each standing
      const standingsWithYear = yearStandings.map(s => ({
        ...s,
        season: String(year)
      }));
      
      allStandings = [...allStandings, ...standingsWithYear];
    });

    console.log(`✓ Fetched ${allStandings.length} total standings records`);

    // Fetch current year races for points progression
    const racesResponse = await axios.get(
      `${JOLPICA_BASE}/${currentYear}/results.json?limit=1000`,
      { timeout: 15000 }
    );
    const races = racesResponse?.data?.MRData?.RaceTable?.Races || [];
    console.log(`✓ Fetched ${races.length} races for ${currentYear}`);

    // Calculate Red Bull points progression
    const pointsProgression = calculateRedBullPoints(races);

    return res.status(200).json({
      standings: allStandings,
      pointsProgression,
      year: currentYear,
      startYear,
      source: 'Jolpica F1 API',
      message: 'Success',
    });
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({
      error: 'Failed to fetch F1 data',
      details: error.message,
    });
  }
}

function calculateRedBullPoints(races) {
  const pointsData = [];
  let cumulativePoints = 0;

  races.forEach((race, index) => {
    if (race.Results && race.Results.length > 0) {
      const redBullResults = race.Results.filter(
        r => r.Constructor?.constructorId === 'red_bull'
      );
      const racePoints = redBullResults.reduce(
        (sum, result) => sum + (parseInt(result.points) || 0),
        0
      );
      cumulativePoints += racePoints;

      pointsData.push({
        round: index + 1,
        raceDate: race.date,
        raceName: race.raceName,
        points: cumulativePoints,
        racePoints: racePoints,
      });
    }
  });

  return { red_bull: { data: pointsData } };
}