import './main.sass'
// Сделать local storage
// Стилизовать

// Получаем все DOM элементы
const player = new Audio()

const btnPlay = document.querySelector('#play')
const btnPause = document.querySelector('#pause')
const btnPrevTrack = document.querySelector('#prevTrack')
const btnNextTrack = document.querySelector('#nextTrack')
const inputVolumeTrack = document.querySelector('#volumeTrack')

// Создаём data
const data = {
  albums: [
    {
      trackPath: require('./assets/music/rozz.mp3'),
      id: 0,
    },
    {
      trackPath: require('./assets/music/defMusic.mp3'),
      id: 1,
    },
  ],
}

// Создаём класс Itunes
class Itunes {
  constructor(data) {
    this.data = data
    this.playing = 0
    this.volume = 0.8
    this.time
  }

  playTrack(id) {
    player.src = this.data.albums[id].trackPath
    player.play()
  }

  pauseTrack() {
    player.pause()
  }

  switchTrack(id) {
    if (!player.paused) {
      this.playTrack(id)
    } else {
      this.pauseTrack()
    }
    console.log('itunes.GetplayingTrack in switchTrack:', this.playingTrack)
    console.log(player.src)
  }

  get playingTrack() {
    return this.playing
  }
  set playingTrack(id) {
    this.switchTrack(this.playingTrack)
    return (this.playing = id)
  }

  switchVolume(value) {
    player.volume = value
    console.log('player.volume:', player.volume)
  }

  get volumeTrack() {
    return this.volume
  }
  set volumeTrack(value) {
    this.switchVolume(value / 100)
    return (this.volume = value)
  }
}

// Создаём инстанс класса Itunes
const itunes = new Itunes(data)

// Создаём методы для работы с инстансом класса Itunes
btnPlay.addEventListener('click', function () {
  itunes.playTrack(itunes.playingTrack)
})

btnPause.addEventListener('click', function () {
  itunes.pauseTrack()
})

btnPrevTrack.addEventListener('click', function () {
  itunes.playingTrack = itunes.playingTrack - 1
  console.log(itunes.playingTrack)
})

btnNextTrack.addEventListener('click', function () {
  itunes.playingTrack = itunes.playingTrack + 1
  console.log(itunes.playingTrack)
})

inputVolumeTrack.addEventListener('input', function (e) {
  itunes.volumeTrack = e.target.value
})
