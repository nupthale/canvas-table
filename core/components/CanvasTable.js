import { useRef, useEffect, useState } from 'react';
import TableEntry from "../index";

import {columns, dataSource} from "./mock";


import {width, height} from "../meta";

export default function CanvasTable() {
    const mountRef = useRef();
    const initRef = useRef(false);
    const [stage, setStage] = useState();

    useEffect(() => {
        if (initRef.current) {
            return;
        }

        initRef.current = true;

        const stage = new TableEntry({
            columns,
            dataSource,
            $root: mountRef.current,
            fixedHeader: true,
        });

        setStage(stage);
    }, []);

    const handleScroll = (scrollLeft, scrollTop) => {
        stage.onScroll(0 - scrollLeft, 0 - scrollTop);
    }

    return (
        <div ref={mountRef} className="container" style={{
            width: `${width}px`,
            height: `${height}px`,
            overflow: 'hidden',
        }}>
            {/*<Scroller*/}
            {/*    width={width}*/}
            {/*    height={height}*/}
            {/*    tableWidth={stage?.container.width}*/}
            {/*    tableHeight={stage?.container.height}*/}
            {/*    onScroll={handleScroll}*/}
            {/*/>*/}
        </div>
    );
}
