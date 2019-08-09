import styled, { css } from 'sinoui-components/styles';

const selectedStyle = css`
  background-color: ${(props) => props.theme.palette.primary[500]};
  color: ${(props) => props.theme.palette.white};
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 20px;
  margin-right: 20px;
  background-color: #f8f8f8;
  position: relative;
  z-index: 100;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-top: 1px solid #9c9c9c;
  ${(props: { selected: boolean }) => props.selected && selectedStyle};

  > span {
    flex: 1;
    font-size: 12px;
    text-align: center;
    padding-right: 15px;
    max-width: 100px;
    height: 25px;
    line-height: 25px;
    display: inline-block;
    overflow: hidden;
  }

  > .sinoui-nav-tab-close_icon {
    font-size: 16px;
    position: absolute;
    right: -16px;
    top: -4px;
  }
`;

export default NavContent;
