import styled from 'styled-components';

export const StyledHoopGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    width: 100%;
    aspect-ratio: 1 / 1;
    max-width: 700px;
`

export default StyledHoopGrid;