import { useRef, useEffect } from 'react';

import { createElement } from "../engine/utils/util";
import Element from "../engine/dom/Element";
import Stage from "../engine/stage";

export default function ZIndex1() {
    const mountRef = useRef();
    const initRef = useRef(false);

    useEffect(() => {
        if (initRef.current) {
            return;
        }

        const style = {
            $div1: {
                position: 'relative',
                width: 500,
                height: 80,
                backgroundColor: "#ccffcc",
            },
            $div2: {
                position: 'relative',
                width: 320,
                height: 200,
                margin: [20, 0, 0, 170],
                backgroundColor: '#ffdddd',
                zIndex: 1,
                // opacity: 0.3,
            },
            $div3: {
                position: 'relative',
                width: 500,
                height: 80,
                margin: [10, 0, 0 , 0],
                backgroundColor: "#ccffcc",

            },
            $div4: {
                position: 'relative',
                width: 250,
                height: 145,
                margin: [65, 0, 0, 50],
                backgroundColor: "blue",
                zIndex: 2,
                opacity: 0.4,
            }
        }

        const $div1 = createElement(Element, {
            style: style.$div1
        }, [
            createElement(Element, {
                style: style.$div2,
            }, [])
        ]);

        const $div4 = createElement(Element, {
            style: style.$div4,
        }, []);

        const $div3 = createElement(Element, {
            style: style.$div3,
        }, [$div4])

        const root = createElement(Element, {}, [$div1, $div3]);


        new Stage(root, mountRef.current).render();

        initRef.current = true;
    }, []);

    return (
        <div ref={mountRef}></div>
    );
}
