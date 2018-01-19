'use strict';

function createNewShoppingListElement(input) {
  return `<li>
            <span class="shopping-item">${input}</span>
            <div class="shopping-item-controls">
            <button class="shopping-item-toggle">
              <span class="button-label">check</span>
            </button>
            <button class="shopping-item-delete">
              <span class="button-label">delete</span>
            </button>
          </div>
        </li>`;
}

$('form button[type="submit"]').on('click', event => {
  event.preventDefault();
  const input = $('form input[type="text"]').val();
  $('form input[type="text"]').val('');
  $('.shopping-list').append(createNewShoppingListElement(input));
});

$('.shopping-list').on('click','.shopping-item-toggle',event => {
  $(event.currentTarget).closest('li').find('span:first').toggleClass('shopping-item__checked');
  // listItem.toggleClass('.shopping-item__checked');
});

$('.shopping-list').on('click', '.shopping-item-delete', event => {
  $(event.currentTarget).closest('li').remove();
});