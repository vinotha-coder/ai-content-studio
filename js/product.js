/* ==========================================
   AI CONTENT STUDIO
   PRODUCT GENERATOR
========================================== */


/* ==========================================
   MAIN FUNCTION
========================================== */

function generateProduct() {


    /* ------------------------------
       GET USER INPUT
    ------------------------------ */

    const productName =
        document
            .getElementById("productName")
            .value
            .trim();


    const brand =
        document
            .getElementById("brand")
            .value
            .trim();


    const category =
        document
            .getElementById("productCategory")
            .value
            .trim();


    const price =
        document
            .getElementById("price")
            .value
            .trim();


    const features =
        document
            .getElementById("features")
            .value
            .trim();


    const customer =
        document
            .getElementById("customer")
            .value
            .trim();


    const image =
        document
            .getElementById("productImage")
            .value
            .trim();



    /* ------------------------------
       VALIDATION
    ------------------------------ */

    if (!productName) {

        alert(
            "Please enter the product name."
        );

        return;
    }


    if (!category) {

        alert(
            "Please select the product category."
        );

        return;
    }



    /* ------------------------------
       EXACT SEARCH QUERY
    ------------------------------ */

    const exactProduct =
        `${brand} ${productName} ${category}`
            .replace(/\s+/g, " ")
            .trim();


    const encodedProduct =
        encodeURIComponent(
            exactProduct
        );



    /* ------------------------------
       PRODUCT IMAGE
    ------------------------------ */

    let productImage = image;


    /*
       If user does NOT provide an image,
       create category-specific image search
       instead of showing a phone image.
    */

    if (!productImage) {

        productImage =
            createProductImage(category);

    }



    /* ------------------------------
       FEATURES
    ------------------------------ */

    let featureArray = [];


    if (features) {

        featureArray =
            features
                .split(",")
                .map(item => item.trim())
                .filter(item => item.length > 0);

    }


    if (featureArray.length === 0) {

        featureArray = [
            `Designed for ${customer || "everyday users"}`,
            "User-friendly design",
            "Reliable performance"
        ];

    }



    /* ------------------------------
       PRODUCT DESCRIPTION
    ------------------------------ */

    const description =
        createProductDescription(
            productName,
            brand,
            category,
            customer
        );



    /* ------------------------------
       PREVIEW
    ------------------------------ */

    const preview =
        document.getElementById(
            "productPreview"
        );


    preview.innerHTML = `

        <div class="product-page-card">


            <!-- ======================
                 IMAGE
            ======================= -->

            <div class="product-image-area">

                <img
                    src="${productImage}"
                    alt="${escapeHTML(productName)}"
                    class="main-product-image"
                    onerror="handleImageError(this)"
                >

                <div class="image-label">

                    ${escapeHTML(category)}

                </div>

            </div>



            <!-- ======================
                 PRODUCT DETAILS
            ======================= -->

            <div class="product-details">


                <div class="badge">

                    ${escapeHTML(category)}

                </div>


                <h1 class="product-title">

                    ${escapeHTML(productName)}

                </h1>


                <p class="brand-name">

                    Brand:

                    <strong>

                        ${escapeHTML(
                            brand || "Generic"
                        )}

                    </strong>

                </p>



                <!-- RATING -->

                <div class="rating">

                    ⭐⭐⭐⭐⭐

                    <span>
                        4.5/5
                    </span>

                </div>



                <!-- PRICE -->

                <div class="product-price">

                    ${escapeHTML(
                        price || "Price not specified"
                    )}

                </div>



                <!-- DESCRIPTION -->

                <p class="product-description">

                    ${description}

                </p>



                <!-- FEATURES -->

                <h2>
                    Key Features
                </h2>


                <ul class="product-features">

                    ${featureArray
                        .map(feature => `

                            <li>

                                <span>
                                    ✓
                                </span>

                                ${escapeHTML(feature)}

                            </li>

                        `)
                        .join("")
                    }

                </ul>



                <!-- ACTIONS -->

                <div class="product-actions">


                    <button
                        class="buy-btn"
                        onclick="openProductSearch()">

                        🛒 Explore Product

                    </button>


                    <button
                        class="wishlist-btn"
                        onclick="saveProduct()">

                        ♡ Save

                    </button>


                </div>


            </div>

        </div>



        <!-- ==========================
             PRODUCT INFORMATION
        =========================== -->

        <div class="product-info-box">


            <h2>
                About This Product
            </h2>


            <p>

                The
                <strong>
                    ${escapeHTML(productName)}
                </strong>

                belongs to the
                <strong>
                    ${escapeHTML(category)}
                </strong>

                category.

                ${brand
                    ? `It is manufactured by ${escapeHTML(brand)}.`
                    : ""
                }

                This product is suitable for
                ${escapeHTML(
                    customer || "general users"
                )}.

            </p>

        </div>

    `;



    /* ------------------------------
       RESOURCES
    ------------------------------ */

    generateProductResources(
        exactProduct
    );

}



/* ==========================================
   CATEGORY BASED IMAGE
========================================== */

function createProductImage(category) {


    /*
       IMPORTANT:
       No phone image is used here.
       Each category gets its own image search.
    */


    const imageMap = {


        "Smartphone":
            "https://loremflickr.com/800/800/smartphone,phone",


        "Laptop":
            "https://loremflickr.com/800/800/laptop,computer",


        "Bluetooth Speaker":
            "https://loremflickr.com/800/800/bluetooth,speaker",


        "Television":
            "https://loremflickr.com/800/800/television,tv",


        "Headphones":
            "https://loremflickr.com/800/800/headphones,audio",


        "Smartwatch":
            "https://loremflickr.com/800/800/smartwatch",


        "Camera":
            "https://loremflickr.com/800/800/camera,dslr",


        "Gaming":
            "https://loremflickr.com/800/800/gaming,console",


        "Home Appliance":
            "https://loremflickr.com/800/800/home,appliance",


        "Other":
            "https://loremflickr.com/800/800/product,ecommerce"

    };


    return (
        imageMap[category] ||
        imageMap["Other"]
    );

}



/* ==========================================
   PRODUCT DESCRIPTION
========================================== */

function createProductDescription(
    productName,
    brand,
    category,
    customer
) {


    let text = `

        ${escapeHTML(productName)}

        is a ${escapeHTML(category)}
        designed for
        ${escapeHTML(
            customer || "everyday users"
        )}.

    `;


    if (brand) {

        text += `

            This product is from
            ${escapeHTML(brand)}
            and focuses on delivering
            practical features and reliable
            performance within its category.

        `;

    } else {

        text += `

            It is designed to provide
            useful features, convenient
            operation and a practical
            user experience.

        `;

    }


    return text;

}



/* ==========================================
   RELATED RESOURCES
========================================== */

function generateProductResources(
    product
) {


    const encoded =
        encodeURIComponent(product);


    const resources =
        document.getElementById(
            "productResources"
        );


    const section =
        document.getElementById(
            "productResourcesSection"
        );


    section.style.display = "block";



    resources.innerHTML = `


        <!-- GOOGLE -->

        <a
            href="https://www.google.com/search?q=${encoded}"
            target="_blank"
            rel="noopener noreferrer">

            <span>
                🔍
            </span>

            <strong>
                Search Product
            </strong>

            <small>
                Exact product search
            </small>

        </a>



        <!-- YOUTUBE -->

        <a
            href="https://www.youtube.com/results?search_query=${encoded}"
            target="_blank"
            rel="noopener noreferrer">

            <span>
                ▶️
            </span>

            <strong>
                Product Videos
            </strong>

            <small>
                Reviews & tutorials
            </small>

        </a>



        <!-- IMAGES -->

        <a
            href="https://www.google.com/search?tbm=isch&q=${encoded}"
            target="_blank"
            rel="noopener noreferrer">

            <span>
                📸
            </span>

            <strong>
                Product Images
            </strong>

            <small>
                Exact product images
            </small>

        </a>



        <!-- REVIEWS -->

        <a
            href="https://www.google.com/search?q=${encodeURIComponent(product + " reviews")}"
            target="_blank"
            rel="noopener noreferrer">

            <span>
                ⭐
            </span>

            <strong>
                Reviews
            </strong>

            <small>
                Customer reviews
            </small>

        </a>



        <!-- SHOPPING -->

        <a
            href="https://www.google.com/search?tbm=shop&q=${encoded}"
            target="_blank"
            rel="noopener noreferrer">

            <span>
                🛒
            </span>

            <strong>
                Shopping
            </strong>

            <small>
                Compare products
            </small>

        </a>



    `;

}



/* ==========================================
   EXPLORE PRODUCT
========================================== */

function openProductSearch() {


    const productName =
        document
            .getElementById("productName")
            .value
            .trim();


    const brand =
        document
            .getElementById("brand")
            .value
            .trim();


    const category =
        document
            .getElementById("productCategory")
            .value
            .trim();


    const query =
        `${brand} ${productName} ${category}`
            .replace(/\s+/g, " ")
            .trim();


    window.open(

        "https://www.google.com/search?q=" +
        encodeURIComponent(query),

        "_blank"

    );

}



/* ==========================================
   SAVE PRODUCT
========================================== */

function saveProduct() {

    const name =
        document
            .getElementById("productName")
            .value
            .trim();


    if (!name) {

        alert(
            "Please generate a product first."
        );

        return;

    }


    localStorage.setItem(

        "savedProduct",

        name

    );


    alert(
        "Product saved successfully ❤️"
    );

}



/* ==========================================
   IMAGE ERROR
========================================== */

function handleImageError(image) {


    /*
       If remote image fails,
       DON'T show a phone image.
    */


    image.style.display = "none";


    const parent =
        image.parentElement;


    parent.innerHTML = `

        <div class="no-product-image">

            <div>
                🛍️
            </div>

            <strong>
                Product Image
            </strong>

            <p>
                Image unavailable
            </p>

        </div>

    `;

}



/* ==========================================
   HTML SECURITY
========================================== */

function escapeHTML(value) {


    return value

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}