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

    return (
        <div ref={mountRef} className="container" style={{
            width: `${width}px`,
            height: `${height}px`,
            overflow: 'hidden',
        }} suppressContentEditableWarning={true}>
        </div>
    );
}
