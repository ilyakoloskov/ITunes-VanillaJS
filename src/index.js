import './main.sass'
// Console
// Сделать local storage
// Стилизовать
// Сделать clearInterval

// Получаем все DOM элементы

const btnPlay = document.querySelector('#play')
const btnPause = document.querySelector('#pause')
const btnPrevTrack = document.querySelector('#prevTrack')
const btnNextTrack = document.querySelector('#nextTrack')
const inputVolumeTrack = document.querySelector('#volumeTrack')
const inputCurrentTime = document.querySelector('#inputCurrentTime')
const divCurrentTime = document.querySelector('#currentTime')

// ALBUMS
const sectionAlbums = document.querySelector('#albums')

// Создаём data
const data = {
  albums: [
    {
      trackPath: require('./assets/music/rozz.mp3'),
      id: 0,
    },
    {
      trackPath: require('./assets/music/Organic Audio - Nurega.mp3'),
      id: 1,
    },
    {
      trackPath: require('./assets/music/Organic Audio - Nurega.mp3'),
      id: 2,
    },
    {
      trackPath: require('./assets/music/Organic Audio - Nurega.mp3'),
      id: 3,
    },
    {
      trackPath: require('./assets/music/Organic Audio - Nurega.mp3'),
      id: 4,
    },
  ],
}

let albums = data.albums.map((el) => {
  let albumTrackPath = el.trackPath
  sectionAlbums.appendChild(document.createElement('div')).classList.add('album')
})

const playerInst = new Audio()
playerInst.preload = 'metadata'

// Создаём класс Itunes
class Itunes {
  constructor(data, player) {
    this.data = data
    this.playing = 0
    this.player = player
    this.player.volume = 0.8
    this.player.currentTime = 0
    this.isPlaying = false
    this.playerInterval = null
  }

  playTrack(id) {
    this.player.src = this.data.albums[id].trackPath
    this.player.play()

    this.currentTimeTrack = this.updateCurrentTimeTrack()
    console.log('Player', this.player)
  }

  pauseTrack() {
    this.player.pause()
    console.log('this.playerInterval', this.playerInterval)
    clearInterval(this.playerInterval)
  }

  switchTrack(id) {
    this.playingTrack = id
    this.playTrack(this.playingTrack)
    this.currentTimeTrack = 0
  }

  get playingTrack() {
    return this.playing
  }
  set playingTrack(id) {
    console.log('switch track id:', id)
    return (this.playing = id)
  }

  get volumeTrack() {
    return this.player.volume
  }
  set volumeTrack(value) {
    console.log('Volume:', this.player.volume)
    return (this.player.volume = value / 100)
  }

  get currentTimeTrack() {
    return this.player.currentTime
  }
  set currentTimeTrack(value) {
    // setInterval(() => {
    //   let minutes = Math.floor(this.player.currentTime / 60)
    //   minutes = minutes >= 10 ? minutes : '0' + minutes
    //   let seconds = Math.floor(this.player.currentTime % 60)
    //   seconds = seconds >= 10 ? seconds : '0' + seconds

    //   console.log(this.currentTimeTrack, minutes + ':' + seconds)
    //   divCurrentTime.innerHTML = minutes + ':' + seconds
    //   inputCurrentTime.value = itunes.currentTimeTrack
    // }, 1000)
    return (this.player.currentTime = value)
  }

  updateCurrentTimeTrack() {
    this.player.addEventListener('loadeddata', function () {
      inputCurrentTime.max = this.duration
    })
    this.playerInterval = setInterval(() => {
      let minutes = Math.floor(this.player.currentTime / 60)
      minutes = minutes >= 10 ? minutes : '0' + minutes
      let seconds = Math.floor(this.player.currentTime % 60)
      seconds = seconds >= 10 ? seconds : '0' + seconds
      console.log(this.currentTimeTrack, minutes + ':' + seconds)
      divCurrentTime.innerHTML = minutes + ':' + seconds
      inputCurrentTime.value = itunes.currentTimeTrack
    }, 1000)

    return (this.currentTimeTrack = inputCurrentTime.value)
  }
}

// Создаём инстанс класса Itunes
const itunes = new Itunes(data, playerInst)

// методы для работы с инстансом класса Itunes
btnPlay.addEventListener('click', function () {
  itunes.playTrack(itunes.playingTrack)
})

btnPause.addEventListener('click', function () {
  itunes.pauseTrack()
})

btnPrevTrack.addEventListener('click', function () {
  itunes.switchTrack(itunes.playingTrack - 1)
})

btnNextTrack.addEventListener('click', function () {
  itunes.switchTrack(itunes.playingTrack + 1)
})

inputVolumeTrack.addEventListener('input', function (e) {
  itunes.volumeTrack = e.target.value
})
