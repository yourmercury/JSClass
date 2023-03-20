class MySet {
  store = [];
  size = 0;

  constructor() {
    for(let member of arguments){
        if(!this.store.includes(member)){
            this.store.push(member);
            this.size++;
        }
    }
  }

  add(value) {
    let hasValue = this.store.includes(value);
    if (hasValue) return false;

    this.store.push(value);
    this.size++;
    return true;
  }

  delete(value){
    let index = this.store.indexOf(value);
    if(index === -1) return false;

    this.store.splice(index, 1);
    this.size--;
    return true;
  }

  getIntersetction(anotherSet){
    let set1 = anotherSet.getSet();
    let set2 = this.store;

    let intersection = [];
    let longerLength = (set1.length > set2.length) ? set1.length : set2.length;

    for(let i=0; i<longerLength; i++){
        let member = set1[i];
        let hasMember = set2.includes(member);

        if(hasMember) intersection.push(member);
    }

    return intersection
  }

  getSize(){
    return this.store.length;
  }

  getSet() {
    return [...this.store];
  }
}

let set = new MySet(10, 30, 50, 100, 200, 30);

console.log(set.getSet())