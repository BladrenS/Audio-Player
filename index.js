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
const play = document.querySelector('.play');
const pause = document.querySelector('.pause');
const audio = new Audio();
let isPlay = false;
let currentTime = 0;
let info
let counter = 0;

function playAudio(path) {
   audio.src = path;
   audio.currentTime = currentTime;
   audio.play();
   isPlay = true;
};

function pauseAudio() {
   currentTime = audio.currentTime;
   audio.pause();
   isPlay = false;
};

async function getInfo() {
   let information = await fetch('https://bladrens.github.io/AudioPlayer/songsInfo.json')
   .then(response => response.json()); 
   return information;
};

async function generateMain(i) {
   const information = await getInfo();
   info = information;
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
   audio.volume = 0.3
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
   pauseAudio();
   currentTime = 0;
   if (randomBoolean) {
      let index = Math.floor(Math.random() * ((document.querySelectorAll('.song').length) - 0) + 0);
      while (index === counter) index = Math.floor(Math.random() * ((document.querySelectorAll('.song').length) - 0) + 0);
      counter = index;
      generateMain(counter);
      playAudio(info[counter].path);
      play.classList.add('hide');
      pause.classList.remove('hide');
   } else {
      counter += 1;
      if (counter >= document.querySelectorAll('.song').length) counter = 0;
      generateMain(counter);
      playAudio(info[counter].path);
      isPlay = true;
      play.classList.add('hide');
      pause.classList.remove('hide');
   }
})

prev.addEventListener('click', () => {
   currentTime = audio.currentTime;
   if (currentTime > 3 && isPlay === true) {
      currentTime = 0;
      playAudio(info[counter].path);
      play.classList.add('hide');
      pause.classList.remove('hide');
   } else {
      pauseAudio();
      counter -= 1;
      currentTime = 0;
      if (counter < 0) counter = document.querySelectorAll('.song').length - 1;
      play.classList.add('hide');
      pause.classList.remove('hide');
      generateMain(counter);
      playAudio(info[counter].path)
   }
})

librarySongs.addEventListener('click', (e) => {
   let element = e.target.closest('div')
   if (element.className[element.className.length - 1] !== 's'){
      counter = Number(element.className.split(' ').pop());     
      generateMain(counter);
      library.classList.remove('moved');
      closeLib.classList.remove('show');
   }
   if (isPlay === true) {
      pauseAudio();
      currentTime = 0;
      playAudio(info[counter].path);
   }
   if (isPlay === false) {
      currentTime = 0;
      playAudio(info[counter].path);
      play.classList.add('hide');
      pause.classList.remove('hide');
   }
})

play.addEventListener('click', () => {
   play.classList.add('hide');
   pause.classList.remove('hide');
   playAudio(info[counter].path);
})

pause.addEventListener('click', () => {
   pause.classList.add('hide');
   play.classList.remove('hide');
   pauseAudio();
})

audio.addEventListener('loadedmetadata', () => {
   document.querySelector('.default-time').innerHTML = `${Math.floor(audio.duration / 60)} : ${Math.floor(audio.duration % 60) < 9 ? '0' + Math.floor(audio.duration % 60) : Math.floor(audio.duration % 60)}`;
})

const volumeSlider = document.querySelector(".volume-slider");
volumeSlider.addEventListener('click', e => {
  const sliderWidth = window.getComputedStyle(volumeSlider).width;
  const newVolume = e.offsetX / parseInt(sliderWidth);
  audio.volume = newVolume;
  document.querySelector(".volume-percent").style.width = newVolume * 100 + '%';
}, false)

const volume = document.querySelector("#volume img");
const noVolume = document.querySelector("#no-volume");
volume.addEventListener('click', () => {
   audio.volume = 0;
   volume.classList.add('hide');
   noVolume.classList.remove('hide');
});

noVolume.addEventListener('click', () => { 
   audio.volume = 0.5;
   document.querySelector(".volume-percent").style.width = 50 + '%';
   noVolume.classList.add('hide');
   volume.classList.remove('hide');
});

const repeat = document.querySelector('#rep-white');
const repeatBlue = document.querySelector('#rep-blue');
let repeatBoolean = false
repeat.addEventListener('click', () => {
   repeat.classList.add('hidden');
   repeatBlue.classList.remove('hidden');
   repeatBoolean = true;
   random.classList.remove('hidden');
   randomBlue.classList.add('hidden');
   randomBoolean = false;
})

repeatBlue.addEventListener('click', () => {
   repeat.classList.remove('hidden');
   repeatBlue.classList.add('hidden');
   repeatBoolean = false;
})

const random = document.querySelector('#random');
const randomBlue = document.querySelector('#random-blue');
let randomBoolean = false;
random.addEventListener('click', () => {
   random.classList.add('hidden');
   randomBlue.classList.remove('hidden');
   randomBoolean = true;
   repeat.classList.remove('hidden');
   repeatBlue.classList.add('hidden');
   repeatBoolean = false;
})

randomBlue.addEventListener('click', () => {
   random.classList.remove('hidden');
   randomBlue.classList.add('hidden');
   randomBoolean = false;
})

const range = document.querySelector('.range')
range.addEventListener("click", e => {
  const rangeWidth = window.getComputedStyle(range).width;
  const timeToSeek = e.offsetX / parseInt(rangeWidth) * audio.duration;
  audio.currentTime = timeToSeek;
}, false);


setInterval(() => {
   document.querySelector('.actual-time').innerHTML = `${Math.floor(audio.currentTime / 60)} : ${Math.floor(audio.currentTime % 60) <= 9 ? '0' + Math.floor(audio.currentTime % 60) : Math.floor(audio.currentTime % 60)}`;
   if (audio.currentTime) document.querySelector('.range').value = audio.currentTime * 100 / audio.duration
   else document.querySelector('.range').value = 0;
   if (repeatBoolean) {
      audio.onended = function() {
         playAudio(info[counter].path);
      }
   } else {   
      audio.onended = function() {
         counter += 1;
         if (counter >= document.querySelectorAll('.song').length) counter = 0
         generateMain(counter);
         playAudio(info[counter].path);
      }
   }
   if (randomBoolean) {
      audio.onended = function() {
         let index = Math.floor(Math.random() * ((document.querySelectorAll('.song').length) - 0) + 0);
         while (index === counter) index = Math.floor(Math.random() * ((document.querySelectorAll('.song').length) - 0) + 0);
         counter = index;
         generateMain(counter);
         playAudio(info[counter].path);
      }
   }
}, 100)


