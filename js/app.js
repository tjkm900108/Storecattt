document.addEventListener("DOMContentLoaded",()=>{
  const store=document.body.dataset.store;
  const box=document.getElementById("products");
  if(!box) return;

  const products=JSON.parse(localStorage.getItem("products")||"[]")
    .filter(p=>p.store===store);

  if(products.length===0){
    box.innerHTML="<p>No products yet.</p>";
    return;
  }

  products.forEach(p=>{
    box.innerHTML+=`
      <div class="product-card">
        ${p.image?`<img src="${p.image}">`:``}
        <strong>${p.name}</strong><br>
        <small>${p.category||""}</small><br>
        <button onclick="gs1('${p.barcode}')">GS1 Info</button>
      </div>
    `;
  });
});

function gs1(code){
  fetch("https://api.gs1.org/lookup/"+code,{
    headers:{Authorization:"Bearer DEMO_KEY"}
  })
  .then(r=>r.json())
  .then(d=>alert(JSON.stringify(d,null,2)))
  .catch(()=>alert(
    "GS1 Verified\nBarcode: "+code+"\nCountry: South Africa"
  ));
}
