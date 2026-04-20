// components/styles.js (WITH ANIMATED BACKGROUND)
import styled, { keyframes } from 'styled-components';

const RED_BULL_BLUE = '#001F3F';
const RED_BULL_YELLOW = '#FFB81C';
const RED_BULL_SILVER = '#E8E8E8';
const DARK_BG = '#0A0E27';

// Animation keyframes
const flowLines = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const pulseGlow = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
`;

const floatUp = keyframes`
  0% { transform: translateY(100vh) translateX(0); opacity: 0; }
  10% { opacity: 0.6; }
  90% { opacity: 0.6; }
  100% { transform: translateY(-10vh) translateX(30px); opacity: 0; }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const PageContainer = styled.div`
  background: linear-gradient(135deg, ${DARK_BG} 0%, #1a1f3a 50%, ${DARK_BG} 100%);
  background-size: 400% 400%;
  animation: ${gradientShift} 15s ease infinite;
  min-height: 100vh;
  color: ${RED_BULL_SILVER};
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  overflow-x: hidden;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 50%, rgba(0, 31, 63, 0.4) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 184, 28, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 40% 20%, rgba(220, 0, 0, 0.1) 0%, transparent 40%);
    pointer-events: none;
    z-index: 0;
    animation: ${pulseGlow} 8s ease-in-out infinite;
  }
`;

// Animated racing lines overlay
export const RacingLines = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;

  &::before, &::after {
    content: '';
    position: absolute;
    width: 200%;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${RED_BULL_YELLOW} 50%,
      transparent 100%
    );
    animation: ${flowLines} 4s linear infinite;
    opacity: 0.3;
  }

  &::before {
    top: 25%;
    animation-duration: 6s;
  }

  &::after {
    top: 75%;
    animation-duration: 8s;
    animation-delay: 2s;
  }
`;

// Floating particles
export const Particles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;

  span {
    position: absolute;
    display: block;
    width: 4px;
    height: 4px;
    background: ${RED_BULL_YELLOW};
    border-radius: 50%;
    box-shadow: 0 0 10px ${RED_BULL_YELLOW};
    animation: ${floatUp} 15s linear infinite;
  }

  span:nth-child(1)  { left: 10%; animation-delay: 0s; animation-duration: 12s; }
  span:nth-child(2)  { left: 20%; animation-delay: 2s; animation-duration: 15s; }
  span:nth-child(3)  { left: 30%; animation-delay: 4s; animation-duration: 10s; }
  span:nth-child(4)  { left: 40%; animation-delay: 1s; animation-duration: 18s; }
  span:nth-child(5)  { left: 50%; animation-delay: 3s; animation-duration: 13s; }
  span:nth-child(6)  { left: 60%; animation-delay: 5s; animation-duration: 16s; }
  span:nth-child(7)  { left: 70%; animation-delay: 2s; animation-duration: 11s; }
  span:nth-child(8)  { left: 80%; animation-delay: 4s; animation-duration: 14s; }
  span:nth-child(9)  { left: 90%; animation-delay: 6s; animation-duration: 17s; }
  span:nth-child(10) { left: 15%; animation-delay: 7s; animation-duration: 12s; }
  span:nth-child(11) { left: 45%; animation-delay: 8s; animation-duration: 15s; }
  span:nth-child(12) { left: 75%; animation-delay: 9s; animation-duration: 13s; }
`;

export const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 50px;
  animation: slideDown 0.8s ease-out;

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-30px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 900;
  margin: 0;
  background: linear-gradient(90deg, ${RED_BULL_YELLOW}, #FFD700, ${RED_BULL_YELLOW});
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-transform: uppercase;
  letter-spacing: 3px;
  animation: shine 3s linear infinite;

  @keyframes shine {
    to { background-position: 200% center; }
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    letter-spacing: 1px;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${RED_BULL_SILVER};
  margin-top: 10px;
  opacity: 0.9;
`;

export const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: ${RED_BULL_YELLOW};
  margin: 30px 0 20px 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-bottom: 2px solid ${RED_BULL_YELLOW};
  padding-bottom: 10px;
`;

export const Card = styled.div`
  background: linear-gradient(135deg, rgba(0, 31, 63, 0.85), rgba(30, 40, 80, 0.85));
  border: 2px solid ${RED_BULL_YELLOW};
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  box-shadow: 0 8px 32px rgba(255, 184, 28, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 48px rgba(255, 184, 28, 0.2);
    border-color: #FFD700;
  }
`;

export const SearchContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
`;

export const SearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid ${RED_BULL_YELLOW};
  border-radius: 8px;
  color: ${RED_BULL_SILVER};
  font-size: 1rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(232, 232, 232, 0.5);
  }

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 20px rgba(255, 184, 28, 0.3);
  }
`;

export const SearchControls = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
`;

export const ToggleLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${RED_BULL_YELLOW};
  font-size: 0.9rem;
  cursor: pointer;
  padding: 8px 12px;
  background: rgba(255, 184, 28, 0.1);
  border: 1px solid ${RED_BULL_YELLOW};
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 184, 28, 0.2);
  }

  input[type="checkbox"] {
    accent-color: ${RED_BULL_YELLOW};
    cursor: pointer;
  }
`;

export const Select = styled.select`
  padding: 8px 12px;
  background: rgba(0, 31, 63, 0.8);
  border: 2px solid ${RED_BULL_YELLOW};
  border-radius: 6px;
  color: ${RED_BULL_SILVER};
  font-size: 0.9rem;
  cursor: pointer;

  &:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(255, 184, 28, 0.3);
  }

  option {
    background: ${RED_BULL_BLUE};
    color: ${RED_BULL_SILVER};
  }
`;

export const SearchModeContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 10px;
  flex-wrap: wrap;
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
  margin: 20px 0;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: rgba(0, 31, 63, 0.6);

  thead {
    background: linear-gradient(90deg, ${RED_BULL_BLUE}, ${RED_BULL_BLUE}dd);
    border-bottom: 3px solid ${RED_BULL_YELLOW};
  }

  th {
    padding: 16px;
    text-align: left;
    color: ${RED_BULL_YELLOW};
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.9rem;
  }

  td {
    padding: 14px 16px;
    border-bottom: 1px solid rgba(255, 184, 28, 0.1);
    transition: background-color 0.2s ease;
  }

  tbody tr {
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 184, 28, 0.08);
      transform: scale(1.01);
    }

    &:nth-child(even) {
      background: rgba(0, 0, 0, 0.2);
    }
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 30px 0;
  flex-wrap: wrap;
`;

export const PaginationButton = styled.button`
  padding: 10px 16px;
  background: ${props => props.active ? RED_BULL_YELLOW : 'rgba(255, 184, 28, 0.2)'};
  color: ${props => props.active ? RED_BULL_BLUE : RED_BULL_YELLOW};
  border: 2px solid ${RED_BULL_YELLOW};
  border-radius: 6px;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.3s ease;
  font-size: 0.95rem;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: ${RED_BULL_YELLOW};
    color: ${RED_BULL_BLUE};
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(255, 184, 28, 0.3);
  }
`;

export const PaginationInfo = styled.span`
  color: ${RED_BULL_YELLOW};
  font-weight: 700;
  min-width: 140px;
  text-align: center;
`;

export const ChartContainer = styled.div`
  background: rgba(0, 31, 63, 0.6);
  border-radius: 12px;
  padding: 30px;
  border: 2px solid ${RED_BULL_YELLOW};
  margin: 30px 0;
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  animation: spin 1s linear infinite;
  color: ${RED_BULL_YELLOW};
  font-size: 1.5rem;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 20px 0;
`;

export const StatCard = styled.div`
  background: linear-gradient(135deg, rgba(255, 184, 28, 0.1), rgba(0, 31, 63, 0.8));
  border: 2px solid ${RED_BULL_YELLOW};
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: #FFD700;
    box-shadow: 0 8px 20px rgba(255, 184, 28, 0.2);
  }

  h3 {
    color: ${RED_BULL_YELLOW};
    font-size: 0.9rem;
    text-transform: uppercase;
    margin: 0;
    opacity: 0.8;
  }

  p {
    color: ${RED_BULL_SILVER};
    font-size: 2rem;
    font-weight: 700;
    margin: 10px 0 0 0;
  }
`;

export const ErrorMessage = styled.div`
  background: rgba(220, 0, 0, 0.2);
  border: 2px solid #DC0000;
  border-radius: 8px;
  padding: 12px;
  color: #FF6B6B;
  margin: 10px 0;
  font-size: 0.9rem;
`;


export const NotesSection = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-left: 3px solid #FFB81C;
  padding: 20px;
  margin-top: 10px;
  animation: slideDown 0.3s ease-out;

  @keyframes slideDown {
    from { opacity: 0; max-height: 0; }
    to { opacity: 1; max-height: 1000px; }
  }
`;

export const NoteItem = styled.div`
  background: rgba(255, 184, 28, 0.08);
  border: 1px solid rgba(255, 184, 28, 0.3);
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 10px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 184, 28, 0.12);
    border-color: #FFB81C;
  }
`;

export const NoteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  font-size: 0.85rem;
`;

export const NoteAuthor = styled.span`
  color: #FFB81C;
  font-weight: 700;
`;

export const NoteDate = styled.span`
  color: rgba(232, 232, 232, 0.6);
  font-size: 0.8rem;
`;

export const NoteText = styled.p`
  color: #E8E8E8;
  margin: 6px 0 0 0;
  line-height: 1.5;
  font-size: 0.95rem;
`;

export const NoteForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 184, 28, 0.2);
`;

export const NoteInput = styled.input`
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 184, 28, 0.5);
  border-radius: 6px;
  color: #E8E8E8;
  font-size: 0.95rem;
  font-family: inherit;

  &::placeholder {
    color: rgba(232, 232, 232, 0.4);
  }

  &:focus {
    outline: none;
    border-color: #FFB81C;
  }
`;

export const NoteTextarea = styled.textarea`
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 184, 28, 0.5);
  border-radius: 6px;
  color: #E8E8E8;
  font-size: 0.95rem;
  font-family: inherit;
  resize: vertical;
  min-height: 70px;

  &::placeholder {
    color: rgba(232, 232, 232, 0.4);
  }

  &:focus {
    outline: none;
    border-color: #FFB81C;
  }
`;

export const NoteButton = styled.button`
  padding: 10px 18px;
  background: #FFB81C;
  color: #001F3F;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.2s ease;
  align-self: flex-start;

  &:hover:not(:disabled) {
    background: #FFD700;
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const DeleteButton = styled.button`
  background: transparent;
  color: rgba(255, 107, 107, 0.7);
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0 4px;
  transition: all 0.2s ease;

  &:hover {
    color: #FF6B6B;
    transform: scale(1.2);
  }
`;

export const ExpandButton = styled.button`
  background: transparent;
  border: 1px solid #FFB81C;
  color: #FFB81C;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s ease;

  &:hover {
    background: #FFB81C;
    color: #001F3F;
  }
`;

export const EmptyNotesMessage = styled.p`
  color: rgba(232, 232, 232, 0.6);
  font-style: italic;
  text-align: center;
  padding: 20px;
`;