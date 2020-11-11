//тонкое тесто
const pizzaThin = document.querySelector("#pizzaThin");

//навигационное меню
const navBar = document.querySelector(".navbar");

//список ингредиентов
const ingredientList = document.querySelector(".list-group");

//кнопка выбора типа теста
const testType = document.querySelector("#btn-test-type");

//див с итоговой текущей ценой
let totalPrice;

// итоговая цена
let finalPrice = 100;

let selectIngredients = [];

// обработка нажатия на кнопку тонкое тесто
pizzaThin.addEventListener("click", function () {
  // добавление элемента с выбором игредиента в навигационное меню
  createElement(
    "div",
    "navbar-select-ingredients",
    `<button type="button" class="btn navbar-select-ingredients__btn" id="btn-select-ingredients" data-toggle="modal" data-target="#tapeDough">Выберите начинку</button>`,
    "",
    document.querySelector(".navbar")
  );

  //отключение кнопки выбора типа теста, после выбора
  testType.disabled = true;

  // карточка с информацией по типу теста и возможностью сменить его
  let cardInfo = createElement(
    "div",
    "card pizza-thickness-card w-100%",
    `<div class="card">` +
      `<div class="card-body">` +
      `<h5 class="card-title">Вы выбрали тонкое тесто для Stan's-пиццы 🍕</h5>` +
      `<p class="card-text">Выберите начинку для вашей пиццы</p>` +
      `<a href="#" class="btn btn-primary id="btn-dough-change"  data-toggle="modal" data-target="#confirmModal">Сменить тесто</a></div></div>`,
    "",
    document.body
  );

  // добавление элемента с итоговой ценой в навигационное меню
  if (selectIngredients.length === 0) {
    createElement(
      "div",
      "navbar-final-price",
      `<button type="button" class="btn navbar-final-price__btn" id="btn-final-price" data-toggle="modal" data-target="#checkoutModal"><h5> Итого: ` +
        `<div class="badge badge-primary totalPrice">` +
        finalPrice +
        " р." +
        "</div></h5></button>",
      "",
      document.querySelector(".navbar")
    );

    //обработка нажатия на кнопку итого

    //див с итоговой текущей ценой
    totalPrice = document.querySelector(".totalPrice");

    //генерация списка итогового заказа
    const navbarFinalPrice = document.querySelector(".navbar-final-price");
    navbarFinalPrice.addEventListener("click", () => {
      const listIngredients = document.querySelector(".list-group-final-price");
      listIngredients.innerHTML = "";
      createElement(
        "li",
        "list-group-item",
        "Тонкое тесто 100р.",
        "",
        listIngredients
      );

      selectIngredients.forEach((element) => {
        console.log(element);
        createElement(
          "li",
          "list-group-item",
          `${element.name} + ${element.price}`,
          "",
          listIngredients
        );
      });
    });
  }
});

function createElement(tagName, className, html, id, ship) {
  let element = document.createElement(tagName);
  element.className = className;
  element.innerHTML = html;
  element.id = id;
  ship.append(element);
}

//обработка нажатия на кнопку смены теста
const btnChangeDough = document.querySelector("#closeChangeDough");
btnChangeDough.addEventListener("click", () => {
  const pizzaThicknessCard = document.querySelector(".pizza-thickness-card");
  pizzaThicknessCard.remove();

  const navbarFinalPrice = document.querySelector(".navbar-final-price");
  navbarFinalPrice.remove();

  const navbarSelectIngredients = document.querySelector(
    ".navbar-select-ingredients"
  );
  navbarSelectIngredients.remove();

  const cardIngredient = document.querySelector(".card-ingredient");
  cardIngredient.remove();

  testType.disabled = false;
});

//создаем массив ингредиентов
const ingredientListArray = [
  {
    ingredientId: "0",
    name: "Колбаса",
    price: "100р.",
  },

  { ingredientId: "1", name: "Ветчина", price: "120р." },

  { ingredientId: "2", name: "Лосось", price: "150р." },

  { ingredientId: "3", name: "Бекон", price: "90р." },

  { ingredientId: "4", name: "Болгарский перец", price: "40р." },

  { ingredientId: "5", name: "Сыр", price: "60р." },

  { ingredientId: "6", name: "Грибы", price: "70р." },

  { ingredientId: "7", name: "Зелень", price: "15р." },

  { ingredientId: "8", name: "Овощи", price: "50р." },
];

ingredientListArray.forEach((element) => {
  createElement(
    "div",
    "list-group-ingredients",
    `<a id="${element.ingredientId}" href="#" class="list-group-item list-group-item-action list-group-item-action-ingredient" aria-hidden="true" data-dismiss="modal">${element.name} + ${element.price}</a>`,
    element.id,
    document.querySelector(".modal-list-ingredients")
  );
});

//обработка нажатия на конкретный ингредиент
const completedListIngredients = document.querySelectorAll(
  ".list-group-item-action-ingredient"
);

completedListIngredients.forEach((element) => {
  element.addEventListener("click", function (event) {
    console.log(event.target);

    //создание карточки с выбранными ингредиентами
    ingredientListArray.forEach((ingredient) => {
      if (ingredient.ingredientId === event.target.id) {
        const selectIngredient = {
          id: selectIngredients.length + 1,
          ...ingredient,
        };

        if (selectIngredients.length === 0) {
          createElement(
            "div",
            "card card-ingredient w-100%",
            `<div class = "card-header card-header-ingredients"><h6> Список ваших ингредиентов:
        </h6></div>`,
            "",
            document.body
          );
        }
        selectIngredients.push(selectIngredient);

        //изменение итоговой цены
        finalPrice += parseInt(selectIngredient.price);
        console.log(totalPrice);
        totalPrice.innerHTML = finalPrice;

        createElement(
          "div",
          `shadow-sm p-3 mb-5 bg-primary rounded card-item-${selectIngredient.id}`,
          `<h5> ${selectIngredient.name} <div class="badge badge-primary"> ${selectIngredient.price} </div>` +
            `<button
          type="button"
          class="close btn-delete-ingredient-${selectIngredient.id}"
          id = "${selectIngredient.id}"
          data-dismiss="modal"
          aria-label="Close">` +
            `<span aria-hidden="true">&times;</span>
        </button></h5>`,
          "",
          document.querySelector(".card-ingredient")
        );

        //обработка нажатия на крестик для удаления конкретного выбранного ингредиента
        const btnDeleteIngredient = document.querySelector(
          `.btn-delete-ingredient-${selectIngredient.id}`
        );

        btnDeleteIngredient.addEventListener("click", (event) => {
          const deletedElementId = event.target.parentElement.id;

          selectIngredients.forEach((ingredient, index) => {
            if (ingredient.id.toString() === deletedElementId) {
              selectIngredients.splice(index, 1);

              //изменение итоговой цены
              finalPrice -= parseInt(selectIngredient.price);
              console.log(totalPrice);
              totalPrice.innerHTML = finalPrice;

              const deletedCardIngredient = document.querySelector(
                `.card-item-${deletedElementId}`
              );
              deletedCardIngredient.remove();

              if (selectIngredients.length === 0) {
                const deletedCardHeaderIngredient = document.querySelector(
                  ".card-ingredient"
                );
                deletedCardHeaderIngredient.remove();
              }
            }
          });
          console.log(selectIngredients);
        });
      }
    });
  });
});

const btnRegistration = document.querySelector(".btn-registration");
btnRegistration.addEventListener("click", () => {
  alert("Ваш заказ оформлен");
});
