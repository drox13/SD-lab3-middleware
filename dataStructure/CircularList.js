class CircularList  {
    constructor(){ 
        this.headNode = null;
        this.pointer = null;
    }

    addNode(node) {
        if(this.headNode == null) {
            this.headNode = node;
            this.pointer = this.headNode
            this.headNode.next = this.headNode;
            this.headNode.previous = this.headNode;
        } else {
            let auxNode = this.headNode;
            while(auxNode.next != this.headNode) {
                auxNode = auxNode.next; 
            }
            auxNode.next = node;
            node.next = this.headNode;
            node.previous = auxNode;
            this.headNode.previous = node;
        }
    }

    removeNode(node) {
        node.previous.next = node.next;
        node.next.previous = node.previous;
        if(this.headNode == node) {
            this.headNode = node.next;
        }
    }

    showList() {
        let auxNode = this.headNode;
        do {
            console.log(auxNode.data);
            auxNode = auxNode.next;
        } while (auxNode != this.headNode)
    }

    nextPointer(){
        return  this.pointer = this.pointer.next;
    }
}

module.exports = CircularList;