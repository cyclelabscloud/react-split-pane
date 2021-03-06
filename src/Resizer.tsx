import React from 'react';
import styles from './SplitPane.scss';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: #ddd;
  opacity: 0.2;
  z-index: 1;
  box-sizing: border-box;
  background-clip: padding-box;
  :hover {
    transition: all 2s ease;
  }
`;

const HorizontalWrapper = styled(Wrapper)`
  height: 11px;
  margin: -5px 0;
  border-top: 5px solid rgba(255, 255, 255, 0);
  border-bottom: 5px solid rgba(255, 255, 255, 0);
  cursor: row-resize;
  width: 100%;
  :hover {
    border-top: 5px solid rgba(0, 0, 0, 0.5);
    border-bottom: 5px solid rgba(0, 0, 0, 0.5);
  }
  .disabled {
    cursor: not-allowed;
  }
  .disabled:hover {
    border-color: transparent;
  }
`;

const VerticalWrapper = styled(Wrapper)`
  width: 11px;
  margin: 0 -5px;
  border-left: 5px solid rgba(255, 255, 255, 0);
  border-right: 5px solid rgba(255, 255, 255, 0);
  cursor: col-resize;
  :hover {
    border-left: 5px solid rgba(0, 0, 0, 0.5);
    border-right: 5px solid rgba(0, 0, 0, 0.5);
  }
  .disabled {
    cursor: not-allowed;
  }
  .disabled:hover {
    border-color: transparent;
  }
`;

export type ResizerProps = {
    index: number,
    split: 'vertical' | 'horizontal',
    className?: string,
    onMouseDown: (e:React.MouseEvent, idx:number) => void,
    onTouchStart: (e:React.TouchEvent, idx:number) => void,
};
export const RESIZER_DEFAULT_CLASSNAME = 'Resizer';


export const Resizer = React.forwardRef<HTMLDivElement, ResizerProps>((
    props, ref,
) => {
    const {
        index,
        split = 'vertical',
        onMouseDown,
        onTouchStart = () => {},
    } = props;

    const resizerProps = {
        ref: ref,
        'data-attribute': split,
        'data-type': 'Resizer',
        onMouseDown: (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => onMouseDown(
            e, index,
        ),
        onTouchStart: (e:React.TouchEvent<HTMLDivElement>) => {
            e.preventDefault();
            onTouchStart(
                e, index,
            );
        },
    };

    return split === 'vertical' ? (
        <VerticalWrapper {...resizerProps} />
    ) : (
        <HorizontalWrapper {...resizerProps} />
    );
});