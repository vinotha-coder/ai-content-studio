function scrollToGenerator() {

    const section =
        document.getElementById("generator");

    if (section) {
        section.scrollIntoView({
            behavior: "smooth"
        });
    } else {
        window.location.href = "blog.html";
    }
}


function openBlogGenerator() {

    window.location.href = "blog.html";

}


function openProductGenerator() {

    window.location.href = "product.html";

}
