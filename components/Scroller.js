import { useRef, useEffect, useState } from 'react';

import {throttle} from "lodash-es";


export const SCROLLBAR_WIDTH = 10;
export const BAR_WIDTH = 10;


// 实现方式一：https://github.com/solt9029/react-scrollable-canvas， 效果不好， 配合canvas translate有明显延时
// 实现方式二，现有方式, 记录scrollLeft和scrollTop，在render的时候， 根据最新的scrollLeft和scrollTop重新计算所有Layer的left和top；
export default function Scroller(props) {
 const { width, height, tableWidth, tableHeight } = props;

 const wrapperRef = useRef();


 const handleScroll = () => {
     if (!wrapperRef.current || !props.onScroll) {
         return;
     }

     const { scrollTop, scrollLeft } = wrapperRef.current;
     props.onScroll(scrollLeft, scrollTop);
 }

 return (
      <div onScroll={handleScroll} ref={wrapperRef} style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${width}px`,
          height: `${height}px`,
          overflow: 'auto'
      }}>
          <div
              style={{
                  width: `${tableWidth}px`,
                  height: `${tableHeight}px`,
                  overflow: 'hidden',
              }}>
          </div>
      </div>
 );
}
