// 'use strict';

// const STORE = [
//   { name: 'apples', completed: false },
//   { name: 'oranges', completed: true },
//   { name: 'bananas', completed: false }
// ]


// function renderShoppingList(input) {
// return `<li>
//           <span class="shopping-item">${input}</span>
//           <div class="shopping-item-controls">
//           <button class="shopping-item-toggle">
//             <span class="button-label">check</span>
//           </button>
//           <button class="shopping-item-delete">
//             <span class="button-label">delete</span>
//           </button>
//         </div>
//       </li>`;
// }


// $('form button[type="submit"]').on('click', event => {
//   event.preventDefault();
//   const input = $('form input[type="text"]').val();
//   $('form input[type="text"]').val('');
//   $('.shopping-list').append(renderShoppingList(input));
// });

// $('.shopping-list').on('click', '.shopping-item-toggle', event => {
//   $(event.currentTarget).closest('li').find('span:first').toggleClass('shopping-item__checked');
//   listItem.toggleClass('.shopping-item__checked');
// });

// $('.shopping-list').on('click', '.shopping-item-delete', event => {
//   $(event.currentTarget).closest('li').remove();
// });




// `STORE` is responsible for storing the underlying data
// that our app needs to keep track of in order to work.
//
// for a shopping list, our data model is pretty simple.
// we just have an array of shopping list items. each one
// is an object with a `name` and a `checked` property that
// indicates if it's checked off or not.
// we're pre-adding items to the shopping list so there's
// something to see when the page first loads.

'use strict';

const STORE = [
  {name: 'apples', checked: false, isBeingHidden: false},
  {name: 'oranges', checked: false, isBeingHidden: false},
  {name: 'milk', checked: true, isBeingHidden: false},
  {name: 'bread', checked: false, isBeingHidden: false}
];

function renderShoppingList() {
  // this function will be repsonsible for rendering the shopping list in
  // the DOM 

  const elements = STORE.map((item, index) => {
    let toggle = item.checked;
    toggle ? toggle = 'shopping-item__checked' :  toggle = '';

    let toggleCheckedItems = item.isBeingHidden;
    toggleCheckedItems ? toggleCheckedItems = 'hide-item' : toggleCheckedItems = '';
    return (`
    <li data-item-index="${index}" class="${toggleCheckedItems}">
        <span class="shopping-item ${toggle}">${item.name}</span>
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle ">
            <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete">
            <span class="button-label">delete</span>
          </button>
        </div>
      </li>
    `);

  });
  $('.shopping-list').html(elements);
 
}

function handleNewItemSubmit() {
  // this function will be responsible for when users add a new shopping list item
  $('form button[type="submit"]').on('click', event => {
    event.preventDefault();
    const item = $('form input[type="text"]').val();
    $('form input[type="text"]').val('');
    STORE.push({name: item, checked: false});
    
    renderShoppingList();
  });
 
  
}


function handleItemCheckClicked() {
  $('.shopping-list').on('click', '.shopping-item-toggle', event => {
    const index = $(event.currentTarget).closest('li').attr('data-item-index');
    STORE[index].checked = !STORE[index].checked;
    renderShoppingList();
  });
  
}


function handleDeleteItemClicked() {
  $('.shopping-list').on('click', '.shopping-item-delete', event => {
    const index = $(event.currentTarget).closest('li').attr('data-item-index');
    STORE.splice(index, 1);
    renderShoppingList();
  });
 
}

function toggleBetweenCheckedItems(){
  $('form input[type="button"]').on('click', event => {
    console.log('clicked');
    STORE.forEach((item)=> {
      if(item.checked === true){
        item.isBeingHidden = !item.isBeingHidden;  
      }
    });
    renderShoppingList();
  });
}

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  toggleBetweenCheckedItems();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);