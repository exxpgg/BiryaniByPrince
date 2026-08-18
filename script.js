const menu = [
  { name: 'Hyderabadi Chicken Dum Biryani', size: '500g & 1kg', tag: 'Bestseller', img: 'assets/bbp-chicken-biryani.jpeg' },
  { name: 'BBP Special Egg Dum Biryani', size: '500g & 1kg', tag: 'House special', img: 'assets/bbp-egg-biryani.jpeg' },
  { name: 'BBP Special Paneer Dum Biryani', size: '500g & 1kg', tag: 'Signature', img: 'assets/bbp-paneer-biryani.jpeg' },
  { name: 'Chicken Handi', size: 'Half 3pc & Full 5pc', tag: 'Kitchen special', img: 'assets/bbp-chicken-handi.jpeg' },
];
const categories = {
  'Hot sellers': [...menu.map(x => x.name), 'Soya Chaap Dum Biryani', 'Bhuna Chicken (Half 3pc / Full 5pc)', 'Laal Maas (Pre-order)'],
  'Vegetarian': ['Shahi Paneer (Half / Full)', 'Matar Paneer (Half / Full)'],
  'Comfort food': ['Curd Rice', 'Daal Khichdi'],
  'Proteins': ['High Protein Omelette', 'Chicken Bowl'],
  'Fried favourites': ['Chicken Popcorn', 'Chicken Wings', 'Chicken Nuggets', 'Chicken Momos Fry', 'Chicken Finger']
};
const addons = ['Raita', 'Boondi Raita', 'Extra Rice (250g)', 'Extra Chicken Piece', 'Onion Salad', 'Birista'];
const featuredMenu = document.querySelector('#featuredMenu');
featuredMenu.innerHTML = menu.map(item => `<article class="menu-card" data-item="${item.name}"><img src="${item.img}" alt="${item.name}"><div class="menu-card-info"><small>${item.tag}</small><button aria-label="Order ${item.name}">+</button><h3>${item.name}</h3><small>${item.size}</small></div></article>`).join('');
const fullMenu = document.querySelector('#fullMenu');
fullMenu.innerHTML = Object.entries(categories).map(([category, items]) => `<section class="menu-list-group"><h3>${category}</h3>${items.map(item => `<div class="menu-list-item"><span>${item}</span><button data-item="${item}" aria-label="Order ${item}">+</button></div>`).join('')}</section>`).join('');
const orderModal = document.querySelector('#orderModal');
const menuModal = document.querySelector('#menuModal');
const orderTitle = document.querySelector('#orderTitle');
let selected = '';
document.querySelector('#addons').innerHTML = `<div class="addons-grid">${addons.map(a => `<label class="addon-check"><input type="checkbox" value="${a}"> ${a}</label>`).join('')}</div>`;
function beginOrder(item){ selected=item; orderTitle.textContent=item; menuModal.close(); orderModal.showModal(); }
document.addEventListener('click', e => { const item = e.target.closest('[data-item]'); if(item) beginOrder(item.dataset.item); if(e.target.matches('#openMenu,#openMenuMobile')) menuModal.showModal(); if(e.target.matches('[data-close]')) document.querySelector('#'+e.target.dataset.close).close(); });
document.querySelector('#quickOrder').addEventListener('click', () => { window.open('https://wa.me/917734096003?text='+encodeURIComponent("Hi Biryani By Prince, I'd like to place an order."), '_blank'); });
document.querySelector('#orderForm').addEventListener('submit', e => { e.preventDefault(); const quantity=document.querySelector('#quantity').value; const extras=[...document.querySelectorAll('#addons input:checked')].map(x=>x.value); const notes=document.querySelector('#instructions').value.trim(); const message=`Hi Biryani By Prince, I'd like to place an order.\n\nItem: ${selected}\nQuantity: ${quantity}\nAdd-ons: ${extras.length ? extras.join(', ') : 'None'}\nSpecial instructions: ${notes || 'None'}`; window.open('https://wa.me/917734096003?text='+encodeURIComponent(message),'_blank'); });
