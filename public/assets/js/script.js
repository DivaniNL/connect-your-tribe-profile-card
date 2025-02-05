
checkActiveTab();
// Make wrapper with same data-number visible after the button with the same data-number is clicked

const navitems = document.querySelectorAll('nav .nav-item');
navitems.forEach(navitem => {
    navitem.addEventListener('click', function(e) {
        let num = this.getAttribute('data-giver');
        console.log(num);
        
        // Toggle active class on the clicked navitem
        this.classList.toggle('active');
        
        // Remove active class from all sibling navitems
        navitems.forEach(sibling => {
            if (sibling !== this) {
                sibling.classList.remove('active');
            }
        });
        
        // Show the corresponding article and hide others
        let toshow = document.querySelector('article.wrapper[data-receiver="'+num+'"]');
        toshow.classList.toggle('active');
        
        document.querySelectorAll('article.wrapper').forEach(sibling => {
            if (sibling !== toshow) {
                sibling.classList.remove('active');
            }
        });
        
        checkActiveTab();
    });
});


document.querySelectorAll('#sidebar .svg-container').forEach(container => {
    container.addEventListener('click', function() {
        const nextElement = this.nextElementSibling;
        if (nextElement.style.display === 'none' || nextElement.style.display === '') {
            nextElement.style.display = 'block';
            this.querySelector('.opened').style.display = "inline";
            this.querySelector('.closed').style.display = "none";
        } else {
            nextElement.style.display = 'none';
            this.querySelector('.opened').style.display = "none";
            this.querySelector('.closed').style.display = "inline";
        }


    });
});

function checkActiveTab() {
    // Show correct wrappers after button press and hide their siblings.
    // Also, the article gets classes so that, when there is no active button, there is no whitespace below the nav. On desktop this removes the border.
    var hasActiveClass = document.querySelectorAll('.wrapper.active').length > 0;
    var aside = document.querySelector('aside');
    var contentDynamicContainer = document.querySelector('.content-wrapper > .content-dynamic-container');

    if (hasActiveClass) {
        aside.classList.remove('no-tab-shown');
        aside.classList.add('collapsed');
        contentDynamicContainer.classList.add('collapsed');
    } else {
        aside.classList.remove('collapsed');
        aside.classList.add('no-tab-shown');
        contentDynamicContainer.classList.remove('collapsed');
    }
}


// Funny player made with help from ChadGPT

function fetchPersonData() {
    const personID = '150'; // Vul hier het juiste personID in

    fetch(`https://fdnd.directus.app/items/person/${personID}`)
        .then(response => response.json())
        .then(personResponseJSON => {
            const customJSON = JSON.parse(personResponseJSON.data.custom);
            console.log(customJSON.liedjes[0].waarde);
            // Zoek de juiste lijst met liedjes
            const songsList = customJSON.liedjes[0].waarde;

            if (!songsList) {
                console.error("❌ Geen liedjes gevonden in de customJSON.");
                return;
            }

            // Object om Audio-elementen bij te houden
            const songs = {};

            // Icons voor de knoppen
            const playIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>`;
            const pauseIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M48 64C21.5 64 0 85.5 0 112L0 400c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5 21.5-48-48-48L48 64zm192 0c-26.5 0-48 21.5-48 48l0 288c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5 21.5-48-48-48l-32 0z"/></svg>`;

            // Maak voor elk liedje een Audio-object aan en koppel een knop
            songsList.forEach(song => {
                songs[song.id] = new Audio(`assets/media/${song.bestand}`);

                // Zoek de juiste knop en voeg een event listener toe
                const button = document.getElementById(`button-${song.id}`);
                if (button) {
                    button.addEventListener("click", function () {
                        playPauseAudio(songs[song.id], this);
                    });
                }
            });

            // Functie om muziek af te spelen of te pauzeren
            function playPauseAudio(selectedSong, button) {
                Object.keys(songs).forEach(id => {
                    if (songs[id] !== selectedSong) {
                        songs[id].pause();
                        songs[id].currentTime = 0;
                        document.getElementById(`button-${id}`).innerHTML = playIcon;
                    }
                });

                if (selectedSong.paused) {
                    selectedSong.play();
                    selectedSong.volume = 0.3;
                    button.innerHTML = pauseIcon;
                } else {
                    selectedSong.pause();
                    button.innerHTML = playIcon;
                }
            }
            console.log(songs);
        })
        .catch(error => console.error("Fout bij laden van JSON:", error));
}

// Roep de functie aan
fetchPersonData();
