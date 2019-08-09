import React from 'react';
import Pop from '@sinoui/pop';
import Icon from 'sinoui-components/Icon';
import { MdMenu, MdClose } from 'react-icons/md';
import styled from 'sinoui-components/styles';
import Page from '../types/Page';

// 会议弹出框
const PopDiv = styled.div`
  width: 130px;
  position: relative;
  padding-top: 39px;
  margin-top: -30px;
  /* margin-left: -22px; */
  left: -10px;
`;

const BoxLayout = styled.div`
  z-index: 3;
  text-align: center;
  background-color: ${(props) => props.theme.palette.background.paper};
  box-shadow: 0px 3px 3px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 1px 1px 10px 0px rgba(0, 0, 0, 0.12);
  border-top: 2px solid ${(props) => props.theme.palette.primary[500]};
  max-height: 500px;
  overflow: auto;
`;

const PopHeader = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.typography.body1.color};
  text-align: left;
  height: 30px;
  padding-left: 10px;
  border-bottom: 1px solid #dedede;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CloseBox = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.palette.danger[500]};
  margin: 0 13px;
  color: #fff;
`;

const PopItem = styled.div`
  line-height: 26px;
  color: ${(props) => props.theme.typography.body1.color};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid #dedede;
  background-color: ${(props) =>
    props.selected && props.theme.palette.primary[500]};
  color: ${(props) => props.selected && props.theme.palette.white};
  padding-right: 30px;
  padding-left: 5px;
`;

const Context = styled.div`
  cursor: default;
  padding: 0 5px;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CloseTabLayout = styled.div`
  margin-right: 10px;
  position: absolute;
  right: 0px;
  bottom: 0px;
  font-size: 1rem;
  cursor: pointer;
  color: ${(props) =>
    props.selected ? props.theme.palette.white : props.theme.palette.grey[500]};
`;

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 10px solid ${(props) => props.theme.palette.primary[500]};
  position: absolute;
  top: 30px;
  right: 25px;
`;

export interface Props {
  items: ReadonlyArray<Page>;
  onClick?: (pageId: string) => void;
  onRequestCloseTab?: (pageId: string) => void;
  activePageId: string;
  onRequestCloseAllTab?: () => void;
}

export interface State {
  open: boolean;
}

export default class OverflowTabsContainer extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = { open: false };
  }

  public componentDidMount() {
    window.addEventListener('resize', () => {
      this.setState({ open: false });
    });
  }

  public onMouseEnter = () => {
    this.setState({
      open: true,
    });
  };

  public onMouseLeave = () => {
    this.setState({
      open: false,
    });
  };

  public render() {
    const {
      items,
      onClick,
      onRequestCloseTab,
      activePageId,
      onRequestCloseAllTab,
    } = this.props;

    const clientWidth = document.body.clientWidth;
    const tabWidth = clientWidth - 240 - 40 - 40;
    const tabsNum = Math.floor(tabWidth / 100);

    const overflowTabs =
      items && items.length > tabsNum ? items.slice(tabsNum) : [];

    return (
      <Pop
        popAction="hover"
        open={this.state.open}
        verticalPosition="bottom"
        horizontalPosition="center"
        autoRePos
        leaveAction
        // zindex={1000}
        render={(close) => (
          <PopDiv onMouseLeave={this.onMouseLeave}>
            <BoxLayout>
              <PopHeader
                onClick={() => {
                  onRequestCloseAllTab();
                  this.setState({
                    open: false,
                  });
                }}
              >
                <CloseBox>x</CloseBox>
                全部关闭
              </PopHeader>
              {overflowTabs.map((tab) => (
                <PopItem
                  selected={activePageId === tab.id}
                  key={tab.id}
                  onClick={() => onClick(tab.id)}
                >
                  <Context title={tab.title}>{tab.title}</Context>
                  <CloseTabLayout
                    selected={activePageId === tab.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      onRequestCloseTab(tab.id);
                    }}
                  >
                    x
                  </CloseTabLayout>
                </PopItem>
              ))}
            </BoxLayout>
            <Triangle />
          </PopDiv>
        )}
      >
        <Icon
          onMouseEnter={this.onMouseEnter}
          style={{ cursor: 'pointer' }}
          color="primary"
        >
          <MdMenu />
        </Icon>
      </Pop>
    );
  }
}
