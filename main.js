import { jsonObj } from './json.js'

let treeHtmlElement = document.querySelector('.tree');

const treeObj = buildTree(JSON.parse(jsonObj).services);

createTree(treeHtmlElement, treeObj);

let toggler = document.querySelectorAll(".caret");

for (let item of toggler) {
  item.addEventListener("click", function(event) {
    this.querySelector(".nested").classList.toggle("active");
    this.classList.toggle("caret-down");
    event.stopPropagation();
})}

function buildTree (array) {

    const map = new Map(array.map(item => [item.id, item]));
    
    for (let item of map.values()) {
      
      if (!map.has(item.head)) {
        continue;
      }
      
      const parent = map.get(item.head);
  
      parent.children = [...parent.children || [], item];
    }
  
    return [...map.values()].filter(item => !item.head);
  }

  function createTree(container, tree) {

    let ul = document.createElement("ul");

    if (container.nodeName !== "DIV") {
      ul.classList.add('nested')
    }

    for (const item of tree) {
        let text = `${item.name} (${item.price} р.)`

        if(item.children) {
            item.children.sort((a, b) => parseFloat(a.sorthead) - parseFloat(b.sorthead));
            let li = document.createElement("li");
            li.classList.add('caret')
            li.append(item.name); 
            createTree(li, item.children);
            ul.append(li);                  
        } else {
            let li = document.createElement("li");
            li.append(text); 
            ul.append(li);                       
        }
    }

    if ( tree.length > 0 ) {
        container.append(ul);                
    }
}

