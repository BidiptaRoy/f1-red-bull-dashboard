// components/Dashboard.js (UPDATED WITH ANIMATIONS + ADVANCED SEARCH)
import { useState, useEffect } from 'react';
import { 
  PageContainer, 
  ContentWrapper, 
  Header, 
  Title, 
  Subtitle, 
  Card, 
  SectionTitle, 
  LoadingSpinner, 
  StatCard, 
  GridContainer,
  RacingLines,
  Particles
} from './styles';
import SearchBar from './SearchBar';
import DataTable from './DataTable';
import PerformanceChart from './PerformanceChart';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [useRegex, setUseRegex] = useState(false);
  const [searchMode, setSearchMode] = useState('AND');
  const [standings, setStandings] = useState([]);
  const [pointsData, setPointsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [startYear, setStartYear] = useState(2015);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/f1data');
      const data = await response.json();
      
      if (data.standings) setStandings(data.standings);
      if (data.pointsProgression) setPointsData(data.pointsProgression);
      if (data.startYear) setStartYear(data.startYear);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Red Bull's current (most recent) standing
  const redBullCurrent = standings
    .filter(s => s.Constructor?.constructorId === 'red_bull')
    .sort((a, b) => parseInt(b.season) - parseInt(a.season))[0];

  // Red Bull championships (1st place finishes) in the dataset
  const redBullChampionships = standings.filter(
    s => s.Constructor?.constructorId === 'red_bull' && s.position === '1'
  ).length;

  const redBullPointsData = pointsData.red_bull?.data || [];

  return (
    <PageContainer>
      {/* Animated background elements */}
      <RacingLines />
      <Particles>
        {[...Array(12)].map((_, i) => <span key={i} />)}
      </Particles>

      <ContentWrapper>
        {/* Header */}
        <Header>
          <Title>🏁 Red Bull F1 Hub</Title>
          <Subtitle>Dominating the Track - Championship Performance Analysis</Subtitle>
        </Header>

        {/* Stats Cards */}
        {!loading && redBullCurrent && (
          <GridContainer>
            <StatCard>
              <h3>Latest Position</h3>
              <p>#{redBullCurrent.position}</p>
            </StatCard>
            <StatCard>
              <h3>{redBullCurrent.season} Points</h3>
              <p>{redBullCurrent.points}</p>
            </StatCard>
            <StatCard>
              <h3>{redBullCurrent.season} Wins</h3>
              <p>{redBullCurrent.wins}</p>
            </StatCard>
            <StatCard>
              <h3>Titles Since {startYear}</h3>
              <p>{redBullChampionships}</p>
            </StatCard>
          </GridContainer>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <LoadingSpinner>⚙️</LoadingSpinner>
            <p style={{ marginTop: '10px' }}>Fetching F1 data...</p>
          </div>
        )}

        {!loading && (
          <>
            {/* Chart */}
            <Card>
              <SectionTitle>📈 Red Bull Points Progression (2024 Season)</SectionTitle>
              <PerformanceChart data={redBullPointsData} teamColor="#FFB81C" />
            </Card>

            {/* Standings Table */}
            <Card>
              <SectionTitle>🏆 Historical Constructor Standings ({startYear}-2024)</SectionTitle>
              <p style={{ opacity: 0.8, marginBottom: '15px' }}>
                Compare Red Bull's performance against other top teams over the years. 
                Try searching "Red Bull AND 2023" or enable Regex for advanced patterns.
              </p>
              <SearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
                useRegex={useRegex}
                setUseRegex={setUseRegex}
                searchMode={searchMode}
                setSearchMode={setSearchMode}
              />
              <DataTable 
                data={standings}
                searchQuery={searchQuery}
                useRegex={useRegex}
                searchMode={searchMode}
              />
            </Card>
          </>
        )}

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '50px', opacity: 0.6, paddingBottom: '20px' }}>
          <p>Data provided by Jolpica F1 API | Red Bull Racing Dashboard</p>
        </div>
      </ContentWrapper>
    </PageContainer>
  );
}