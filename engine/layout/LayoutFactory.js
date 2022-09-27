import _StaticLayout_backup from "./StaticLayout";

import AbsoluteLayout from './AbsoluteLayout';

import RelativeLayout from './RelativeLayout';
import StickyLayout from './StickyLayout';

export default class LayoutFactory {
    static make(element) {
        let layout;

        const style = element.getComputedStyle();

        switch (style.position) {
            case 'absolute':
                layout = new AbsoluteLayout(element);
                break;
            case 'relative':
                layout = new RelativeLayout(element);
                break;
            case 'sticky':
                layout = new StickyLayout(element);
                break;
            case 'static':
            default:
                layout = new _StaticLayout_backup(element);
                break;
        }

        return layout;
    }
}
