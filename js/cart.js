var cart = {}; //корзина


$.getJSON('goods.json', function (data) {
    var goods = data; //все товары в массиве
    // console.log(goods);
    checkCart();
    //console.log(cart);
    showCart(); //вывожу товары на страницу

    function showCart() {
        if ($.isEmptyObject(cart)) {
            //корзина пуста
            var out = 'Корзина пуста. Добавьте товар в корзину <a href="index.html">главная страница</a>';
            $('#my-cart').html(out);
        }
        else {
            var out = '';
            for (var key in cart) {
                out += '<div class="row"><div class="cntr"><div class="col-xl-1 col-lg-1 col-sm-1"><button class="delete" data-art="' + key + '" >x</button></div>';
                out += '<div class="col-xl-3 col-lg-3 col-sm-3"><img src="' + goods[key].image + '" width="100"></div>';
                out += '<div class="col-xl-2 col-lg-2 col-sm-2">' + goods[key].name + '</div>';
                out += '<div class="col-xl-1 col-lg-1 col-sm-1"><button class="minus" data-art="' + key + '">-</button></div>';
                out += '<div class="col-xl-1 col-lg-1 col-sm-1">' + cart[key] + '</div>';
                out += '<div class="col-xl-1 col-lg-1 col-sm-1"><button class="plus" data-art="' + key + '">+</button></div>';
                out += '<div class="col-xl-3 col-lg-3 col-sm-3">' + cart[key] * goods[key].cost + '</div>';
                out += '<br></div> </div>';
            }
            $('#my-cart').html(out);
            $('.plus').on('click', plusGoods);
            $('.minus').on('click', minusGoods);
            $('.delete').on('click', deleteGoods);
        }
    }

    function plusGoods() {
        var articul = $(this).attr('data-art');
        cart[articul]++;
        saveCartToLS(); //сохраняю корзину в localStorage
        showCart();
    }

    function minusGoods() {
        var articul = $(this).attr('data-art');
        if (cart[articul] > 1) {
            cart[articul]--;
        }
        else {
            delete cart[articul];
        }
        saveCartToLS();//сохраняю корзину в localStorage
        showCart();
    }

    function deleteGoods() {
        var articul = $(this).attr('data-art');
        delete cart[articul];
        saveCartToLS();//сохраняю корзину в localStorage
        showCart();
    }


});

function checkCart() {
    //проверяю наличие корзины в localStorage;
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

function saveCartToLS() {
    localStorage.setItem('cart', JSON.stringify(cart));
}