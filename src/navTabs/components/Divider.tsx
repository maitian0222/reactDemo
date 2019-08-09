import styled from 'sinoui-components/styles';

const Divider = styled.div`
  width: 100%;
  position: relative;
  z-index: 102;
  border-bottom: 1px solid ${(props) => props.theme.palette.primary[500]};
`;

export default Divider;
