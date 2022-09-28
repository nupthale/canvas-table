import { useRef, useEffect } from 'react';

import { createElement } from "../engine/utils/util";
import Element from "../engine/dom/Element";
import Stage from "../engine/stage";

import Animation from "../engine/animation/Animation";

let stage;

let $div1, $div2;

export default function AnimationTest() {
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
                position: 'absolute',
                width: 150,
                height: 200,
                top: 20,
                left: 170,
                // margin: [20, 0, 0, 170],
                backgroundColor: '#ffdddd',
                zIndex: 1,
                boxShadow: [],
                opacity: 0.3,
            },
        }

        $div2 = createElement(Element, {
            style: style.$div2,
        }, []);

        $div1 = createElement(Element, {
            style: style.$div1
        }, [
            $div2,
        ]);




        const root = createElement(Element, {}, [$div1]);

        stage = new Stage(root, mountRef.current);
        stage.render();

        initRef.current = true;
    }, []);

    return (
        <>
            <button onClick={() => {
                new Animation({
                    startValue: 0.3,
                    endValue: 1,
                    duration: 300,
                    onChange(val) {
                        console.info('#animation', val);

                        $div2.style.update({
                            opacity: val,
                        });

                        stage.repaint();
                    }
                }).start();
            }}>start</button>
            <div ref={mountRef}></div>
        </>
    );
}
