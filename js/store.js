const user=JSON.parse(localStorage.getItem("user"))||{name:"guest"};
const cartKey="cart_"+user.phone;
let cart=JSON.parse(localStorage.getItem(cartKey))||[];
const products=JSON.parse(localStorage.getItem("products"))||[];

function loadStore(store){
  const main=document.getElementById("content");
  const grouped={};

  products.filter(p=>p.store===store).forEach(p=>{
    grouped[p.category]=grouped[p.category]||[];
    grouped[p.category].push(p);
  });

  for(const cat in grouped){
    const sec=document.createElement("section");
    sec.innerHTML="<h3>"+cat+"</h3>";

    grouped[cat].forEach(p=>{
      sec.innerHTML+=`
      <div class="product">
        <img src="${p.image||''}" style="width:80px">
        <div>
          <strong>${p.name}</strong><br>
          ${p.price||''}
          <button onclick="add('${p.name}')">Add</button>
          <button onclick="insight('${p.name}','${p.insight}','${p.image}')">GS1</button>
        </div>
      </div>`;
    });

    main.appendChild(sec);
  }
}

function add(item){
  cart.push(item);
  localStorage.setItem(cartKey,JSON.stringify(cart));
  alert("Added");
}

function showCart(){
  alert(cart.join("\\n")||"Empty");
}

function insight(title,text,img){
  mTitle.innerText=title;
  mText.innerText=text;
  mImg.src=img;
  modal.style.display="flex";
}

function closeModal(){
  modal.style.display="none";
}
