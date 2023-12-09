import styled from "styled-components";

const StyledSelect = styled.select`
  border: 0;
  background-color: #D1D2D1;
  border-radius: 10px;
  font-size: 0.75rem;
  padding: 2px 5px;
`;

const FilterProduct = (props) => {

  const onFilterValueChanged = (event) => {
    props.filterValueSelected(event.target.value)
  }

  return (
    <div>
      <StyledSelect name="isAvailable" id="isAvailable" onChange={onFilterValueChanged}>
        <option value="visi">Visi</option>
        <option value="atsakyti">Atsakyti</option>
        <option value="neatsakyti">Neatsakyti</option>
      </StyledSelect>
    </div>
  );
}
 
export default FilterProduct;