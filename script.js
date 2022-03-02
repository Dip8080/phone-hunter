// sweep search input 
const clearContainer = id => {
    const clearArea = document.getElementById(id);
    clearArea.value = '';
}

// show error
const showError = display => {
    document.getElementById('show_error').style.display = display;
}
const showError2 = display => {
    document.getElementById('show_error2').style.display = display;
}


// toogleSpinner

const toogleSpinner = display => {
    document.getElementById('loader').style.display = display;
}

// fetching and showing result after search button clicked
// step one: fetching 
document.getElementById('search_btn').addEventListener('click', () => {
    toogleSpinner('block');
    const inputField = document.getElementById('input_field');
    const inputValue = inputField.value;
    if (inputValue == '') {
        const parent = document.getElementById('append_search');
        const parent2 = document.getElementById('append_details');
        parent2.textContent = '';
        parent.textContent = '';
        showError2('block');
        showError('none');
        toogleSpinner('none');
    }
    else {
        showError2('none');
        clearContainer('input_field');
        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
            .then(rcvData => rcvData.json())
            .then(data => showSearchResult(data.data))
    }
})

// show fetched data into the browser
const showSearchResult = arrayOfObjects => {
    const parent = document.getElementById('append_search');
    const parent2 = document.getElementById('append_details');

    if (arrayOfObjects.length == 0) {
        console.log('null array')
        parent.textContent = '';
        parent2.textContent = '';
        showError('block');
        showError2('none');
        toogleSpinner('none')
    }
    else {
        showError('none');
        parent2.textContent = '';
        parent.textContent = '';
        arrayOfObjects.slice(0, 20)?.forEach(object => {
            const newDiv = document.createElement('div')
            newDiv.innerHTML = `
      <div class="flex justify-center bg-light-300 rounded shadow p-5">
           <div>
               <img class="py-3" src="${object.image}" alt="">
               <h1 class="shadow bg-light-300 p-2" >brand : ${object.brand}</h1>
           <p class="shadow bg-light-300 p-2  mt-2">Name : ${object.phone_name.slice(0, 50)}</p>
           <a href=#append_details > <button href=#append_details class="mt-3 antialiased shadow-lg bg-cyan-400 p-2 rounded" onclick="fetchDetails('${object.slug}')">Details</button> </a>
           </div>
       
      </div>
      `

            parent.appendChild(newDiv);
        });
        toogleSpinner('none');
    }
}
// catching  phone id then fetching it's details 
const fetchDetails = id => {
    // toogleSpinner('block')
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(rcvData => rcvData.json())
        .then(data => showDetails(data.data))
        .catch(error => {
            alert('try another phone....' + " " + error)
        })
}
// showing details into the browser
const showDetails = data => {
    // console.log(data.others)
    const otherData = data.others;
    const pair = Object.entries(otherData)
    console.log(otherData);
    const Sensors = data.mainFeatures.sensors
    //    console.log(Sensors)
    const parent = document.getElementById('append_details');
    parent.textContent = '';
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `
   <div class="grid g-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-2  bg-light-300 rounded shadow p-3">

   <div class="px-3 mt-6 w-86">
       <img style="width:95%" class="" src="${data.image}" alt="">
       <h1 class=" antialiased text-xl mt-2">Brand :<span class="text-xl"> ${data.brand} </span></h1>
   </div>

     <div class=" py-3 px-3">
   <h1 class=" antialiased text-xl mt-2">Name :<span class="text-base"> ${data.name}
    </span></h1>
   <p  class=" antialiased text-xl">Release date :<span class ="text-base">
    ${data.releaseDate.slice(0, 50) ? data.releaseDate : 'sorry, Not found'} <span></p>
   <p class = " pt-3 antialiased" > <span class="text-xl"> Mainfeature : </span>    <br>
   chipset : ${data.mainFeatures.chipSet} <br>
   displaySize : ${data.mainFeatures.displaySize}<br>
   memory : ${data.mainFeatures.memory} <br>
   storage : ${data.mainFeatures.storage} <br>
   </P>
  
   
   <h1 class="antialiased text-xl mt-2"> Sensors: </h1>
    ${Sensors.map(x => ` ${x} `).join(',')}

    <h1 class="antialiased text-xl mt-2"> Others: </h1>
    <h1> ${pair.join('    ') ? pair : ''} </h1>
    
     </div>
    </div>  
                
    `

    parent.appendChild(newDiv)


}
