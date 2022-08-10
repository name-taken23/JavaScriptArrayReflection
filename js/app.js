const logger = console.log;
const table = console.table;
const src = 'https://picsum.photos/300';
const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const storage = [];
let email;
let url;
let x = 0;
let y = 0;


function fetchImg() {
    fetch(src).then(response => {
        $('.mainImg').attr("src", response.url);
        url = response.url;
    })
}


function search(email) {
    var result;
    for (var i = 0, len = storage.length; i < len; i++) {
        x++;
        if (storage[i][0] === email) {
            result = storage[i];

            break;
        }
    }
    return result;
}
$(window).on('load', fetchImg);



$('.submit-btn').on('click', () => {
    email = document.forms["emailSubmission"]["email"].value;
    if (regex.test(email) == false) {
        alert("Please enter a valid email.");
    } else if (storage[x] == null) {
        storage.push([email, url]);
        table(storage);
        fetchImg();
        var option = $("<option></option").text(email).attr("value", x);
        $('#saved__Emails').append(option);

    } else if (storage[x][y] == email) {
        storage[x].push(url);
        table(storage);
        fetchImg();

    }
    else if (!search(email)) {//need to perform check on storage

        storage.push([email, url]);
        var option = $("<option></option").text(email).attr("value", x);
        $('#saved__Emails').append(option);

        table(storage);

    } else if (search(email)) {
        x = storage.findIndex(e => e.includes(email));
        storage[x].push(url);
        logger(x);
        table(storage);
    }
});



$('#saved__Emails').change(function () {
    if ($(this).val() === "none") {
        $("img").remove(".items");
    } else if ($(this).val()) {
        $("img").remove(".items");
        var indexer = $(this).val()

        for (let p = 1; p < storage[indexer].length; p++) {
            
            content = $('<img class="items">').attr("src", storage[indexer][p]);
            $('.imgDisplayContainer div div').append(content);
        }

    }
});





