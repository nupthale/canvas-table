import { useRef, useEffect } from 'react';

import { createElement } from "../engine/utils/util";
import Element from "../engine/dom/Element";
import Scrollable from "../engine/dom/Scrollable";
import Text from '../engine/dom/Text';
import Stage from "../engine/stage";

export default function Scrollable1() {
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
                height: 500,
                backgroundColor: "red",
            },
            $div2: {
                position: 'relative',
                width: 1000,
                height: 1000,
                backgroundColor: 'blue',
                zIndex: 1,
                fontSize: '24px',
                // opacity: 0.3,
            },
        }

        const $div1 = createElement(Scrollable, {
            scrollWidth: 1000,
            scrollHeight: 1000,
            style: style.$div1,
            onScroll: () => {
                stage.render();
            },
        }, [
            createElement(Element, {
                style: style.$div2,
            }, [
                createElement(Text, {
                    text: 'hasdfhasdhfasjhdfkjahsdfjhasdfjhasjkdhfasjhdfajshdfkjashfjkashfkjashfjkashfjashf',
                }, [])
            ])
        ]);

        const root = createElement(Element, {}, [$div1]);


        const stage = new Stage(root, mountRef.current);

        stage.render();

        initRef.current = true;
    }, []);

    return (
        <div ref={mountRef}></div>
    );
}
