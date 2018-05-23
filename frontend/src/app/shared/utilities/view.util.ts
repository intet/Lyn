export function getSelectedWord() {
    let s = window.getSelection();
    let range = s.getRangeAt(0);
    let node = s.anchorNode;
    if (range.startOffset > 0) {
        range.setStart(node, (range.startOffset - 1));
        while (isLetter(range.toString().charAt(0))) {
            range.setStart(node, (range.startOffset - 1));
        }

        range.setStart(node, (range.startOffset + 1));
    }

    do {
        range.setEnd(node, range.endOffset + 1);
    } while (isLetter(range.toString().charAt(range.toString().length - 1))
    && range.toString().trim() != '');
    range.setEnd(node, range.endOffset - 1);
    return range.toString().trim();
}

export function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}