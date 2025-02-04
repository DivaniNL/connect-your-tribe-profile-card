
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

const song_ko = new Audio('assets/media/KO.mp3');
const song_luchtballon = new Audio('assets/media/Luchtballon.mp3');
const song_cestlavie = new Audio('assets/media/CESTLAVIE.mp3');
const song_ratata = new Audio('assets/media/Ratata.mp3');
const song_rockmode = new Audio('assets/media/rockmode.mp3');

const songs = [song_ko, song_luchtballon, song_cestlavie, song_ratata, song_rockmode];

const playIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>`;
const pauseIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M48 64C21.5 64 0 85.5 0 112L0 400c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48L48 64zm192 0c-26.5 0-48 21.5-48 48l0 288c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48l-32 0z"/></svg>`;

function playPauseAudio(selectedSong, button) {
    const siblings = button.parentElement.parentElement.querySelectorAll('.button');
    siblings.forEach(sibling => {
        if (sibling !== button) {
            sibling.innerHTML = playIcon;
        }
    });
    songs.forEach(song => {
        if (song !== selectedSong) {
            song.pause();
            song.currentTime = 0; // Reset the song to the beginning
            

        }
    });

    if (selectedSong.paused) {
        selectedSong.play();
        selectedSong.volume = 0.3;
        button.innerHTML = pauseIcon; // Change icon to pause
    } else {
        selectedSong.pause();
        button.innerHTML = playIcon; // Change icon to play
    }
}

// Add event listeners to the buttons
document.getElementById('button-ko').addEventListener('click', function() {
    playPauseAudio(song_ko, this);
});
document.getElementById('button-luchtballon').addEventListener('click', function() {
    playPauseAudio(song_luchtballon, this);
});
document.getElementById('button-cestlavie').addEventListener('click', function() {
    playPauseAudio(song_cestlavie, this);
});
document.getElementById('button-ratata').addEventListener('click', function() {
    playPauseAudio(song_ratata, this);
});
document.getElementById('button-rockmode').addEventListener('click', function() {
    playPauseAudio(song_rockmode, this);
});
