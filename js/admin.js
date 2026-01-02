let products=JSON.parse(localStorage.getItem("products")||"[]");
let editId=null;

function save(){localStorage.setItem("products",JSON.stringify(products))}

function addProduct(){
  const store=storeEl.value.toLowerCase();
  const name=nameEl.value;
  const cat=catEl.value;
  const bar=barEl.value;
  const img=imageEl.files[0];

  if(!store||!name){alert("Missing fields");return}

  const reader=new FileReader();
  reader.onload=()=>{
    const data={
      id:editId||Date.now(),
      store,name,category:cat,barcode:bar,
      image:reader.result
    };

    if(editId){
      products=products.map(p=>p.id===editId?data:p);
      editId=null;
    }else products.push(data);

    save();render();clear();
  };
  img?reader.readAsDataURL(img):reader.onload();
}

function render(){
  list.innerHTML="";
  products.forEach(p=>{
    list.innerHTML+=`
      <div class="product-card">
        ${p.image?`<img src="${p.image}">`:``}
        ${p.name} (${p.store})
        <button onclick="edit(${p.id})">Edit</button>
        <button onclick="del(${p.id})">Del</button>
      </div>`;
  });
}

function edit(id){
  const p=products.find(x=>x.id===id);
  storeEl.value=p.store;
  nameEl.value=p.name;
  catEl.value=p.category;
  barEl.value=p.barcode;
  editId=id;
}
function del(id){
  products=products.filter(p=>p.id!==id);
  save();render();
}
function clear(){
  storeEl.value=nameEl.value=catEl.value=barEl.value="";
  imageEl.value="";
}
render();
