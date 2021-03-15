function cardsHtml(symbol, id, name) {
  const cardsHtml = `<div class="card">
      <div class="card-body cardStyle">
      <label class="switch">
        <input type="checkbox"   id="${symbol}"  onchange="favs('${symbol}')">
        <span class="slider round"></span>
        </label>
        <h5 class="card-title">${symbol}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${name}</h6>
      
        <a id="collapseid${id}" href="#collapseCoinInfo${id}" class="card-link btn btn-primary" onclick="moreInfo('${id}')"
         data-bs-toggle="collapse" role="button" aria-expanded="false"
          aria-controls="collapseCoinInfo${id}">more info</a>
        <div class="collapse" id="collapseCoinInfo${id}">
        <div class="card card-body" id="collapseBody">
        <p id="moreInfoContent${id}"></p>
        </div>
      </div>
      </div>`;
  return cardsHtml;
}

function aboutHtml() {
  const aboutHtml = `  <div id= "about">
    <h1>About :</h1>
    <h3>Hey 👋 my name is Niv Amitay</h3>
    <p>
      I have made this project as part of my FullStack web developer course at
      john bryce,<br />
      This ptoject is a site that gives you information about Cryptocurrency
      (like values in Nis,Euro and Usd). <br />
      And let you track their value with dynamic chart that updates every two seconds
    </p>
    <img src="IMG-20190211-WA0008.jpg" id="my-picture">
    </div>`;
  return aboutHtml;
}

function moreInfoHtml(usd, eur, ils, img) {
  const moreInfoHTML = `USD $: ${usd}<br>
      EURO &#8364 :${eur}<br>
      ILS &#8362: ${ils}<br>
      LOGO : <img src="${img}" />`;
  return moreInfoHTML;
}

function modalHtml(arr, symbol) {
  const modalHtml = `<div class="modal showModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">You can choose up to 5 coins.<br> Pick the coin you want to remove</h5><br>
            
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="closeModal()"></button>
          </div>
          <div id="modalContent" class="modal-body">
          <p  class="row"><span class = "modalContentName">${arr[0]}</span> <label class="switch col-1" id="switchModal">
               <input type="checkbox" id="modalCheckbox" onchange="modalSliderChange('${arr[0]}','${symbol}')">
               <span class="slider round"></span>
               </label></p>
          <p class="row"><span class = "modalContentName">${arr[1]}</span> <label class="switch col-1" id="switchModal">
               <input type="checkbox" onchange="modalSliderChange('${arr[1]}','${symbol}')">
               <span class="slider round"></span>
               </label></p>
          <p class="row"><span class = "modalContentName">${arr[2]}</span> <label class="switch col-1" id="switchModal">
               <input type="checkbox" onchange="modalSliderChange('${arr[2]}','${symbol}')">
               <span class="slider round"></span>
               </label></p>
          <p class="row"><span class = "modalContentName">${arr[3]}</span> <label class="switch col-1" id="switchModal">
               <input type="checkbox" onchange="modalSliderChange('${arr[3]}','${symbol}')">
               <span class="slider round"></span>
               </label></p>
          <p class="row"><span class = "modalContentName">${arr[4]}</span> <label class="switch col-1" id="switchModal">
               <input type="checkbox" onchange="modalSliderChange('${arr[4]}','${symbol}')">
               <span class="slider round"></span>
               </label></p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="closeModal()">Cancel</button>
            
          </div>
        </div>
      </div>
    </div>`;
  return modalHtml;
}
