import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
`;

export const LabelWrapper = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`;

export const Label = styled.span`
  display: flex;
  align-items: center;
  font-size: 32px;
  font-weight: 200;
  span {
    font-size: 16px;
    margin-left: 3px;
  }
`;
