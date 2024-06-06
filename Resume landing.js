// script.js
const form = document.querySelector('form');
const pdfDiv = document.querySelector('#pdf');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const website = document.querySelector('#website').value;
    const jobTitle = document.querySelector('#jobTitle').value;
    const knowsAbout = document.querySelector('#knowsAbout').value;

    const resumeContent = `
        <section itemscope itemtype="http://schema.org/Person">
            <h2>Candidate</h2>
            <p>
                Name: <span itemprop="name">${name}</span>
            </p>
            <p>
                Email: <span itemprop="email">${email}</span>
            </p>
            <p>
                Website: <a itemprop="url" href="${website}">${website}</a>
            </p>
            <p>
                ${jobTitle} that enjoys <span itemprop="knowsAbout">${knowsAbout}</span>.
            </p>
        </section>
    `;

    pdfDiv.innerHTML = resumeContent;
});