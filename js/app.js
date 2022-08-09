const logger = console.log;
const src = 'https://picsum.photos/300';



fetch(src).then(response => {
    const img = $('.mainImg').attr("src", response.url);
    logger(response.url);
})