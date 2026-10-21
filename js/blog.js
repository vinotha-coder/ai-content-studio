async function generateBlog() {

    const topic =
        document.getElementById("blogTopic").value.trim();

    const audience =
        document.getElementById("audience").value;

    const tone =
        document.getElementById("tone").value;

    const language =
        document.getElementById("language").value;

    const length =
        document.getElementById("length").value;

    const keywords =
        document.getElementById("keywords").value;


    if (!topic) {

        alert("Please enter a topic.");

        return;
    }


    const preview =
        document.getElementById("blogPreview");


    preview.innerHTML = `
        <div class="empty-state">

            <div>⏳</div>

            <h3>AI is creating your blog...</h3>

            <p>
                Analysing your topic and generating
                professional content.
            </p>

        </div>
    `;


    try {

        const response = await fetch(
            "http://localhost:5000/api/generate-blog",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    topic,
                    audience,
                    tone,
                    language,
                    length,
                    keywords

                })
            }
        );


        const data = await response.json();


        if (!data.success) {
            throw new Error(data.error);
        }


        preview.innerHTML = `
            <article class="blog-result">

                ${data.content}

            </article>
        `;


        generateResources(topic);

        generateRelatedTopics(topic);

        generateImageSection(topic);

    }

    catch (error) {

        console.error(error);

        preview.innerHTML = `
            <div class="empty-state">

                <div>⚠️</div>

                <h3>Generation failed</h3>

                <p>
                    Please check your backend server
                    and API configuration.
                </p>

            </div>
        `;

    }

}


/* ---------------------------------------
   USEFUL RESOURCES
---------------------------------------- */

function generateResources(topic) {

    const resources =
        document.getElementById("resources");


    const query =
        encodeURIComponent(topic);


    resources.innerHTML = `

        <div class="resource-card">

            <div class="feature-icon">
                🔍
            </div>

            <h3>Google Search</h3>

            <p>
                Search for detailed information
                about this topic.
            </p>

            <a
                href="https://www.google.com/search?q=${query}"
                target="_blank"
                rel="noopener noreferrer">

                Search Topic →

            </a>

        </div>


        <div class="resource-card">

            <div class="feature-icon">
                ▶️
            </div>

            <h3>YouTube</h3>

            <p>
                Find videos, tutorials and
                explanations related to this topic.
            </p>

            <a
                href="https://www.youtube.com/results?search_query=${query}"
                target="_blank"
                rel="noopener noreferrer">

                Watch Videos →

            </a>

        </div>


        <div class="resource-card">

            <div class="feature-icon">
                📰
            </div>

            <h3>Google News</h3>

            <p>
                Find recent news and updates
                about this topic.
            </p>

            <a
                href="https://news.google.com/search?q=${query}"
                target="_blank"
                rel="noopener noreferrer">

                Latest News →

            </a>

        </div>


        <div class="resource-card">

            <div class="feature-icon">
                💬
            </div>

            <h3>Reddit</h3>

            <p>
                Explore community discussions
                and user experiences.
            </p>

            <a
                href="https://www.reddit.com/search/?q=${query}"
                target="_blank"
                rel="noopener noreferrer">

                Community →

            </a>

        </div>


        <div class="resource-card">

            <div class="feature-icon">
                🛒
            </div>

            <h3>Amazon</h3>

            <p>
                Explore products related to
                the topic when applicable.
            </p>

            <a
                href="https://www.amazon.in/s?k=${query}"
                target="_blank"
                rel="noopener noreferrer">

                Explore Products →

            </a>

        </div>

    `;

}


/* ---------------------------------------
   RELATED TOPICS
---------------------------------------- */

function generateRelatedTopics(topic) {

    const container =
        document.getElementById("blogPreview");


    const encodedTopic =
        encodeURIComponent(topic);


    const relatedHTML = `

        <section class="related-section">

            <h2>
                🔗 Explore Related Topics
            </h2>

            <div class="related-grid">

                <a
                    href="https://www.google.com/search?q=${encodedTopic}+guide"
                    target="_blank"
                    rel="noopener noreferrer">

                    ${topic} Guide

                </a>


                <a
                    href="https://www.google.com/search?q=best+${encodedTopic}"
                    target="_blank"
                    rel="noopener noreferrer">

                    Best ${topic}

                </a>


                <a
                    href="https://www.google.com/search?q=${encodedTopic}+tips"
                    target="_blank"
                    rel="noopener noreferrer">

                    ${topic} Tips

                </a>


                <a
                    href="https://www.google.com/search?q=${encodedTopic}+reviews"
                    target="_blank"
                    rel="noopener noreferrer">

                    ${topic} Reviews

                </a>

            </div>

        </section>

    `;


    container.insertAdjacentHTML(
        "beforeend",
        relatedHTML
    );

}


/* ---------------------------------------
   IMAGE SECTION
---------------------------------------- */

function generateImageSection(topic) {

    const container =
        document.getElementById("blogPreview");


    const query =
        encodeURIComponent(topic);


    const imageHTML = `

        <section class="image-section">

            <h2>
                📸 Explore Images
            </h2>

            <p>
                Find relevant images for this topic.
            </p>

            <div class="image-links">

                <a
                    href="https://www.google.com/search?tbm=isch&q=${query}"
                    target="_blank"
                    rel="noopener noreferrer">

                    🖼 Google Images

                </a>


                <a
                    href="https://unsplash.com/s/photos/${query}"
                    target="_blank"
                    rel="noopener noreferrer">

                    📷 Unsplash

                </a>


                <a
                    href="https://www.pexels.com/search/${query}/"
                    target="_blank"
                    rel="noopener noreferrer">

                    📷 Pexels

                </a>

            </div>

        </section>

    `;


    container.insertAdjacentHTML(
        "beforeend",
        imageHTML
    );

}