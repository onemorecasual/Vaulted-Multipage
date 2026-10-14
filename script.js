/* Vaulted VTG multipage storefront demo.
   Replace sampleProducts with real stock. This static site does not process payments. */
const sampleProducts = [
 {id:1,name:"Broken-In Graphic Tee",category:"vintage",price:18,bg:"#d7c6ae",color:"#8a5544",glyph:"✳",tag:"VINTAGE"},
 {id:2,name:"Y2K Statement Top",category:"y2k",price:16,bg:"#d6d4bd",color:"#5d6651",glyph:"✦",tag:"Y2K"},
 {id:3,name:"Classic Blue Denim",category:"denim",price:28,bg:"#c5d0d0",color:"#435b6a",glyph:"〰",tag:"DENIM"},
 {id:4,name:"Everyday Modern Layer",category:"modern",price:22,bg:"#ded5c4",color:"#8b8573",glyph:"✳",tag:"MODERN"},
 {id:5,name:"Vintage Western Shirt",category:"vintage",price:24,bg:"#d9c5a8",color:"#a65c3b",glyph:"✶",tag:"VINTAGE"},
 {id:6,name:"Y2K Mini Skirt",category:"y2k",price:20,bg:"#d2c6d0",color:"#7a5e76",glyph:"✦",tag:"Y2K"},
 {id:7,name:"Denim Forever Jeans",category:"denim",price:32,bg:"#c5d0d0",color:"#465e73",glyph:"〰",tag:"DENIM"},
 {id:8,name:"Modern Easy Button-Up",category:"modern",price:19,bg:"#e2d9c7",color:"#a6a08c",glyph:"✳",tag:"MODERN"}
];
let bag = [];
let activeFilter = new URLSearchParams(location.search).get("category") || "all";
let sortMode = "featured";
const money = n => "$" + n.toFixed(2);
function productCard(p){
 return `<article class="product-card"><div class="product-image" style="--product-bg:${p.bg};--product-color:${p.color}" data-glyph="${p.glyph}"><span class="tag">${p.tag}</span></div><div class="product-info"><h3>${p.name}</h3><div class="product-meta"><span>${p.category.toUpperCase()}</span><strong>${money(p.price)}</strong></div><button class="add-button" data-add="${p.id}">ADD TO BAG +</button></div></article>`;
}
function renderProducts(){
 const featured = document.querySelector("[data-featured-products]");
 if(featured) featured.innerHTML = sampleProducts.slice(0,4).map(productCard).join("");
 const grid = document.querySelector("[data-shop-products]");
 if(grid){
   let items = sampleProducts.filter(p=>activeFilter==="all"||p.category===activeFilter);
   if(sortMode==="low") items.sort((a,b)=>a.price-b.price);
   if(sortMode==="high") items.sort((a,b)=>b.price-a.price);
   grid.innerHTML = items.length ? items.map(productCard).join("") : "<p>No items in this category yet.</p>";
   document.querySelectorAll("[data-filter]").forEach(b=>b.classList.toggle("selected",b.dataset.filter===activeFilter));
 }
}
function renderBag(){
 document.querySelectorAll("[data-bag-count]").forEach(el=>el.textContent=bag.reduce((n,p)=>n+p.qty,0));
 document.querySelectorAll("[data-bag-total]").forEach(el=>el.textContent=money(bag.reduce((n,p)=>n+p.price*p.qty,0)));
 document.querySelectorAll("[data-bag-items]").forEach(el=>{
   el.innerHTML=bag.length?bag.map(p=>`<div class="bag-line"><div><strong>${p.name}</strong><br><span>${p.qty} × ${money(p.price)}</span></div><button data-remove="${p.id}">Remove</button></div>`).join(""):"<p>Your bag is looking pretty empty.</p><p class='small-note'>Find something good on the rack.</p>";
 });
}
function openBag(){
 document.querySelector(".bag-drawer")?.classList.add("open");
 document.querySelector(".bag-drawer")?.setAttribute("aria-hidden","false");
 document.querySelector(".overlay")?.classList.add("visible");document.body.classList.add("bag-open");
}
function closeBag(){
 document.querySelector(".bag-drawer")?.classList.remove("open");
 document.querySelector(".bag-drawer")?.setAttribute("aria-hidden","true");
 document.querySelector(".overlay")?.classList.remove("visible");document.body.classList.remove("bag-open");
}
document.addEventListener("click",e=>{
 const add=e.target.closest("[data-add]");
 if(add){const p=sampleProducts.find(x=>x.id===Number(add.dataset.add));const found=bag.find(x=>x.id===p.id);if(found)found.qty++;else bag.push({...p,qty:1});renderBag();openBag();}
 const remove=e.target.closest("[data-remove]");if(remove){bag=bag.filter(p=>p.id!==Number(remove.dataset.remove));renderBag();}
 if(e.target.closest("[data-open-bag]"))openBag();
 if(e.target.closest("[data-close-bag]"))closeBag();
 const filter=e.target.closest("[data-filter]");if(filter){activeFilter=filter.dataset.filter;renderProducts();}
});
document.querySelector("[data-sort]")?.addEventListener("change",e=>{sortMode=e.target.value;renderProducts()});
const menuToggle=document.querySelector(".menu-toggle");
menuToggle?.addEventListener("click",()=>{const nav=document.querySelector(".nav");const open=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));});
document.querySelectorAll("[data-year]").forEach(el=>el.textContent=new Date().getFullYear());
renderProducts();renderBag();
