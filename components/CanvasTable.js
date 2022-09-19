import { useRef, useEffect } from 'react';
import Table from "../core/index";

import {PIXEL_RATIO} from "../core/utils/util";


const columns = [
    {title: 'avatar', dataIndex: 'avatar' },
    {title: 'name',dataIndex: 'name' },
    {title: 'age', dataIndex: 'age'},
    {title: 'address', dataIndex: 'address' }
];

const dataSource = [
    {avatar: '🎅🏻',name: 'chuanJianGuo', age: 74, address: 'America'},
    {avatar: '👵🏻', name: 'caiEnglish', age: 63, address: 'China Taiwan'},
    {avatar: '-',name: 'trump', age: 74, address: 'America'},
    {avatar: '-',name: 'johnson', age: 70, address: 'England'}
];

export default function CanvasTable() {
    const canvasRef = useRef();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const table = new Table({
                columns,
                dataSource,
                $canvas: canvasRef.current,
            });

            table.render();
        }
    }, []);

    const width = 1000;
    const height = 800;

    return (
        <div>
            <canvas
                width={width * PIXEL_RATIO}
                height={height * PIXEL_RATIO}
                style={{height: `${height}px`, width: `${width}px`}}
                ref={canvasRef}
            />
        </div>
    );
}
