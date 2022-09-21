import { useRef, useEffect, useState } from 'react';
import TableEntry from "../core/index";

import Scroller from './Scroller';

import {columns, dataSource} from "./mock";


import {width, height} from "../core/meta";

export default function CanvasTable() {
    const mountRef = useRef();
    const initRef = useRef(false);
    const [tableEntry, setTableEntry] = useState();

    useEffect(() => {
        if (initRef.current) {
            return;
        }

        initRef.current = true;

        const tableEntry = new TableEntry({
            columns,
            dataSource,
            $root: mountRef.current,
            fixedHeader: true,
        });

        setTableEntry(tableEntry);
    }, []);

    const handleScroll = (scrollLeft, scrollTop) => {
        tableEntry.onScroll(0 - scrollLeft, 0 - scrollTop);
    }

    return (
        <div ref={mountRef} className="container" style={{
            width: `${width}px`,
            height: `${height}px`,
            overflow: 'hidden',
        }}>
            <Scroller
                width={width}
                height={height}
                tableWidth={tableEntry?.container.width}
                tableHeight={tableEntry?.container.height}
                onScroll={handleScroll}
            />
        </div>
    );
}
