export function getSelectedWord() {
    let s = window.getSelection();
    let range = s.getRangeAt(0);
    let node = s.anchorNode;
    while (range.toString().indexOf(' ') != 0) {
        range.setStart(node, (range.startOffset - 1));
    }
    range.setStart(node, range.startOffset + 1);
    do {
        range.setEnd(node, range.endOffset + 1);

    } while (range.toString().indexOf(' ') == -1 && range.toString().trim() != '');
    let str = range.toString().trim();
    return str;
}