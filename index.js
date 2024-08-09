const song = document.querySelector('.song-name');
const artist = document.querySelector('.artist');
const lyrics = document.querySelector('.controls-lyrics');
const text = document.querySelector('.song-text')
const img = document.querySelector('.img');
const bodyImg = document.querySelector('body');
const left = document.querySelector('.left');
const library = document.querySelector('.library');
const closeButton = document.querySelector('.close-text');
const closeLib = document.querySelector('.close-library');
const librarySongs = document.querySelector('.library-songs');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
let counter = 0;

async function getInfo() {
   let information = await fetch('./songsInfo.JSON')
   .then(response => response.json()); 
   return information;
};
getInfo();

async function generateMain(i) {
   const information = await getInfo();
   song.innerHTML = information[i].song;
   artist.innerHTML = information[i].artist;
   text.innerHTML = information[i].text;
   img.src = information[i].img;
   bodyImg.setAttribute('background', `${information[i].img}`);
}
generateMain(counter);

async function generateLibrary() {
   const information = await getInfo();
   for (let i = 0; i < information.length; i += 1) {
      let div = document.createElement('div');
      let span = document.createElement('span');
      let img = document.createElement('img');
      img.src = information[i].img;
      img.alt = 'svg';
      img.classList.add('lib-img');
      div.classList.add('song', `${i}`);
      span.innerHTML = `${information[i].artist} - ${information[i].song}`;
      div.appendChild(img);
      div.appendChild(span);
      librarySongs.appendChild(div);
   }
}
generateLibrary();

left.addEventListener('click', () => {
   library.classList.add('moved');
   closeLib.classList.add('show');
})

lyrics.addEventListener('click', () => {
   text.classList.add('top');
   closeButton.classList.add('show');
})

closeButton.addEventListener('click', () => {
   text.classList.remove('top');
   closeButton.classList.remove('show');
})

closeLib.addEventListener('click', () => {
   library.classList.remove('moved');
   closeLib.classList.remove('show');
})

next.addEventListener('click', () => {
   counter += 1; 
   if (counter >= document.querySelectorAll('.song').length) counter = 0
   generateMain(counter);
})

prev.addEventListener('click', () => {
   counter -= 1; 
   if (counter < 0) counter = document.querySelectorAll('.song').length - 1
   generateMain(counter);
})

librarySongs.addEventListener('click', (e) => {
   let element = e.target.closest('div')
   if (element.className[element.className.length - 1] !== 's'){
      counter = Number(element.className[element.className.length - 1]);
      generateMain(counter);
      library.classList.remove('moved');
      closeLib.classList.remove('show');
   }     
})

