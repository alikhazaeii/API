const main = document.querySelector('main')
const header = document.querySelector('header')

setInterval(Loadding, 20000);
let apiDetail = 'loading'
const load = document.querySelector('.loader')
function Loadding(){
  header.innerHTML = `
<h3>#</h3>
<h3>coin name</h3>
<h3>coin price</h3>
<h3>24h</h3>
<h3>24h high price</h3>
<h3>24h low price</h3>
`
apiDetail = 'loading'


fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false')
  
  .then(response =>
  {
    if(!response.ok){
    throw new Error("error");
    
  }
  return response.json();
})
    
    
    

  .then(data => {

    apiDetail = 'ok'
    load.style.opacity='0'

    data.map(val => {
      const art = document.createElement('article')
      art.innerHTML = `
      <p>${val.market_cap_rank}</p>
      <figure>
      <img src="${val.image}" alt="">
      <figcaption>
       <h2>${val.name}</h2>
      <h3>${val.symbol}</h3>
      </figcaption>
      </figure>
      <div class="carrentprice">
      <h2>${'$' + ' ' + val.current_price}</h2>
      </div>
      <div class="pricechange">
      <h2>${(val.price_change_percentage_24h).toFixed(2) + '%'}</h2>
      </div>
      <div class="high">
      <h2>${'$' + '  ' + val.high_24h}</h2>
      </div>
      <div class="low">
      <h2>${'$' + '  ' + val.low_24h}</h2>
      </div>
      
      `

      const priceChangeElement = art.querySelector('.pricechange h2');

      if (priceChangeElement) {
        const num = val.price_change_percentage_24h;
        if (num < 0) {
          priceChangeElement.style.color = 'red'; 
          
        } else if (num > 0) {
          priceChangeElement.style.color = 'green'; 
          priceChangeElement.innerHTML= '+' + num.toFixed(2) + '%' 
        } else {
          priceChangeElement.style.color = 'gray'; 
        }
      }

      main.appendChild(art);
    });
  })
  
  
  .catch(error=>{
    console.error('data error',error);
    apiDetail = 'error'
    load.style.opacity='1'
  })







}
Loadding()

