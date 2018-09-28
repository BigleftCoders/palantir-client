import * as React from 'react';
import {findDOMNode} from 'react-dom';

interface IProps {
  children: React.ReactChild;
  onClickOutside: (e: Event) => void;
}

class OnClickOutside extends React.Component<IProps, object> {
  private handler: (e: Event) => void

  componentDidMount() {
    const node = findDOMNode(this);

    this.handler = e => {
      if (node && e.target instanceof Element && node.contains(e.target)) {
        return;
      }

      this.props.onClickOutside(e);
    }

    document.addEventListener('click', this.handler);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handler);
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

export default OnClickOutside;
