// All the innerHtml functions are in innerHtml.js

// global varibles
let favArr;
let searchObj = [];
const searchInput = document.querySelector('#search-input');
function isFavArr() {
  if (JSON.parse(localStorage.getItem(`tracking`)) == null) {
    favArr = [];
  } else {
    favArr = JSON.parse(localStorage.getItem(`tracking`));
  }
}
const loadingSpiner = document.querySelector('.loading');

// About section
function aboutTab() {
  const get = document.querySelector('#content');
  get.innerHTML = aboutHtml();
}

loadingSpiner.classList.remove('hidden');

// show the coin cards
async function getCoin() {
  searchObj = [];
  let content = document.querySelector('#content');
  content.innerHTML = '';
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/coins/list');
    const coinData = await res.json();

    for (let i = 0; i < 120; i++) {
      let newCoin = document.createElement('div');
      newCoin.className = `col-12 col-md-6 col-xl-4 m-0 `;
      newCoin.innerHTML = cardsHtml(
        coinData[i].symbol,
        coinData[i].id,
        coinData[i].name
      );
      content.appendChild(newCoin);
      saveCoins = {
        symbol: coinData[i].symbol,
        id: coinData[i].id,
        name: coinData[i].name,
      };
      searchObj.push(saveCoins);
      let tracking = localStorage.getItem(`tracking`);
      if (tracking !== null) {
        stayChecked(`${coinData[i].symbol}`);
      }
    }

    isFavArr();
    loadingSpiner.classList.add('hidden');
  } catch (e) {
    console.log(e);
  }
}

getCoin();

// show the more info data
async function moreInfo(coinId) {
  try {
    if (
      document.querySelector(`#collapseid${coinId}`).textContent == 'more info'
    ) {
      document.querySelector(`#collapseid${coinId}`).textContent = 'less info';
    } else {
      document.querySelector(`#collapseid${coinId}`).textContent = 'more info';
    }
    loadingSpiner.classList.remove('hidden');
    let counter = 0;
    let arr = JSON.parse(localStorage.getItem(`coins${coinId}`));
    let currentTime = Date.now();
    counter++;
    const moreInfoContent = document.querySelector(`#moreInfoContent${coinId}`);

    if (arr === null || currentTime - arr[1] > 120000) {
      arr = [];

      const res1 = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`
      );
      const coinInfo = await res1.json();
      moreInfoContent.innerHTML = moreInfoHtml(
        coinInfo.market_data.current_price.usd,
        coinInfo.market_data.current_price.eur,
        coinInfo.market_data.current_price.ils,
        coinInfo.image.small
      );
      let coinStorage = {
        usdValue: coinInfo.market_data.current_price.usd,
        euroValue: coinInfo.market_data.current_price.eur,
        ilsValue: coinInfo.market_data.current_price.ils,
        coinLogo: coinInfo.image.small,
      };
      let timer = Date.now();
      arr.push(coinStorage);
      arr.push(timer);
      localStorage.setItem(`coins${coinId}`, JSON.stringify(arr));
    }
    // bring the more info data from the local storage
    else {
      let arr = JSON.parse(localStorage.getItem(`coins${coinId}`));
      for (let i = 0; i < 1; i++) {
        moreInfoContent.innerHTML = moreInfoHtml(
          arr[i].usdValue,
          arr[i].euroValue,
          arr[i].ilsValue,
          arr[i].coinLogo
        );
        console.log(arr[i].usdValue, i);
        let coinStorage = {
          usdValue: arr[i].usdValue,
          euroValue: arr[i].euroValue,
          ilsValue: arr[i].ilsValue,
          coinLogo: arr[i].coinLogo,
        };
      }
    }
    loadingSpiner.classList.add('hidden');
  } catch (e) {
    console.log(e);
  }
}

// create the favorites list
function favs(addedSymbol) {
  const content = document.querySelector('#modal');
  let coinSymbol = addedSymbol;
  if (favArr.length < 5) {
    if (favArr.includes(coinSymbol)) {
      for (let i = 0; i < favArr.length; i++) {
        if (favArr[i] == coinSymbol) {
          favArr.splice(i, 1);
        }
      }
      localStorage.setItem(`tracking`, JSON.stringify(favArr));
    } else {
      favArr.push(coinSymbol);
      localStorage.setItem(`tracking`, JSON.stringify(favArr));
    }
  } else {
    if (favArr.includes(coinSymbol)) {
      for (let i = 0; i < favArr.length; i++) {
        if (favArr[i] == coinSymbol) {
          favArr.splice(i, 1);
        }
      }
      localStorage.setItem(`tracking`, JSON.stringify(favArr));
    }
    // create the modal if the favorites list is longer then 5
    else {
      modal(coinSymbol);
    }
  }
}

// closing the modal
function closeModal() {
  const showModal = document.querySelector('.showModal');
  showModal.classList.remove('showModal');
}

// changes the favorites list in the modal
function modalSliderChange(removedItem, addedItem) {
  for (let i = 0; i < favArr.length; i++) {
    if (favArr[i] == removedItem) {
      document.querySelector('#' + removedItem).checked = false;
      favArr[i] = addedItem;
      document.querySelector('#' + addedItem).checked = true;
      localStorage.setItem(`tracking`, JSON.stringify(favArr));
    }
  }

  //   removedItem.checked = false;
  closeModal();
}

function clearLocalStorage() {
  favArr = [];
  localStorage.setItem(`tracking`, JSON.stringify(favArr));
}

// sets off the search function on every buttom press
searchInput.addEventListener('keyup', function search() {
  content.innerHTML = '';
  let searchValue = document.querySelector('#search-input').value;
  searchValue = searchValue.toLowerCase();
  for (let i = 0; i < searchObj.length; i++) {
    if (searchObj[i].symbol.includes(searchValue)) {
      let newCoin = document.createElement('div');
      newCoin.className = `col-12 col-md-6 col-xl-4 m-0 `;
      newCoin.innerHTML = cardsHtml(
        searchObj[i].symbol,
        searchObj[i].id,
        searchObj[i].name
      );
      content.appendChild(newCoin);
    }
  }
});

// keeps the checkbox checked after refresh
function stayChecked(symbol) {
  let keep = document.getElementById(`${symbol}`);
  if (JSON.parse(localStorage.getItem(`tracking`)).indexOf(symbol) > -1) {
    keep.checked = true;
  } else {
    keep.checked = false;
  }
}
function modal(coinSymbol) {
  const newModal = document.createElement('div');

  newModal.innerHTML = modalHtml(favArr, coinSymbol);
  content.appendChild(newModal);
}
