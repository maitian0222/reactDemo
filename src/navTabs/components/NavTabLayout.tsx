import styled, { css, withProps } from 'sinoui-components/styles';

export interface Props {
  zIndex: number;
  selected: boolean;
}

const selectedStyle = css`
  height: 26px;
  z-index: 1000 !important;

  > .sinooa-nav-tab-item_left,
  .sinooa-nav-tab-item_right {
    background-color: ${(props) => props.theme.palette.primary[500]};
    border-top: 1px solid ${(props) => props.theme.palette.primary[500]} !important;
  }
`;

const NavTabLayout = withProps<Props>()(styled.div)`
  height: 26px;
  color: #333;
  width: 120px;
  position: relative;
  display: inline-block;
  transform: translateX(-5px);
  overflow: hidden;
  flex-shrink: 0;
  cursor: pointer;
  margin: 0 -10px;
  // flex-shrink: 1;
  z-index: ${(props) => props.zIndex};

  ${(props) => props.selected && selectedStyle};
`;

export default NavTabLayout;
