import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styles from './popover.css';
interface Props {
  title: React.ReactNode;
  content: React.ReactNode;
  children: React.ReactNode;
}

export default class Popover extends React.PureComponent<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.refsArray = [];
    this.state = {
      position: {
        left: '0px',
        top: '0px',
      },
    };
  }
  public componentDidMount() {
    this.refsArray.forEach((ref) => {
      console.log(ref.current.offsetTop);
    });
    this.setState({
      position: {
        left: this.refsArray[0].current.offsetLeft,
        top: this.refsArray[0].current.offsetTop,
      },
    });
  }

  public render() {
    const RenderBodyContainer = ReactDOM.createPortal(
      <div
        style={{
          position: 'absolute',
          top: '0px',
          left: '0px',
          width: '100%;',
        }}
      >
        <div>
          <div
            className={styles['popover']}
            style={{
              left: this.state.position.left,
              top: this.state.position.top,
            }}
          >
            <div className="arrow" />
            <div className="inner">
              <div className="title">title</div>
              <div className="content">content</div>
            </div>
          </div>
        </div>
      </div>,
      document.body,
    );
    return (
      <>
        {RenderBodyContainer}
        <>
          {React.Children.map(this.props.children, (child, index) => {
            const ref = React.createRef();
            this.refsArray.push(ref);

            return React.cloneElement(child, { ref, key: index });
          })}
        </>
      </>
    );
  }
}
