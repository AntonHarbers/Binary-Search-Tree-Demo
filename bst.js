class Node {
    constructor(value, left, right){
        this.value = value;
        this.left = null;
        this.right = null;
    }

    print(a) {
        return a;
    }
}

class Tree {
    constructor(array) {
        this.root = null;
        this.array = array;
    }
}

module.exports = {Node, Tree};
