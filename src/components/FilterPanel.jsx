import styled from "styled-components";

const FilterPanel = ({ search, setSearch, sortOrder, setSortOrder }) => {
  return (
    <FilterWrapper>
      <Input
        type="text"
        placeholder="Поиск по цитате или автору"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="asc">Сортировать: A → Z</option>
        <option value="desc">Сортировать: Z → A</option>
      </Select>

      <button
        onClick={() => {
          setSearch("");
          setSortOrder("asc");
        }}
      >
        Сбросить
      </button>
    </FilterWrapper>
  );
};

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0 20px;
  margin-bottom: 10px;
  background: #e9eff6;
  line-height: 40px;
  border-width: 0;
  border-radius: 20px;
  margin: 0;
`;
const Select = styled.select`
  border: 1px solid #000;
  border-radius: 5px;
  padding: 10px 20px;
  background-color: #e9eff6;
  cursor: pointer;
  border-width: 0;
  border-radius: 20px;
  appearance: none;
  margin: 0;
`;
const FilterWrapper = styled.div`
  position: absolute;
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 20px;
`;
export default FilterPanel;
