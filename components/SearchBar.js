// components/SearchBar.js (WITH REGEX + BOOLEAN)
import { SearchContainer, SearchInput, SearchModeContainer, ToggleLabel, Select } from './styles';

export default function SearchBar({ 
  value, 
  onChange, 
  useRegex, 
  setUseRegex,
  searchMode,
  setSearchMode,
  placeholder 
}) {
  return (
    <div>
      <SearchContainer>
        <SearchInput
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || (useRegex 
            ? "Enter regex pattern..." 
            : "Search... (use AND/OR between terms for boolean search)")}
        />
      </SearchContainer>
      <SearchModeContainer>
        <ToggleLabel>
          <input
            type="checkbox"
            checked={useRegex}
            onChange={(e) => setUseRegex(e.target.checked)}
          />
          Regex Mode
        </ToggleLabel>
        <ToggleLabel>
          Boolean Logic:
          <Select
            value={searchMode}
            onChange={(e) => setSearchMode(e.target.value)}
          >
            <option value="AND">AND (all terms match)</option>
            <option value="OR">OR (any term matches)</option>
          </Select>
        </ToggleLabel>
      </SearchModeContainer>
    </div>
  );
}