import './main.sass'
// Сделать local storage
// Стилизовать

// Получаем все DOM элементы

const btnPlay = document.querySelector('#play')
const btnPause = document.querySelector('#pause')
const btnPrevTrack = document.querySelector('#prevTrack')
const btnNextTrack = document.querySelector('#nextTrack')
const inputVolumeTrack = document.querySelector('#volumeTrack')
const divCurrentTime = document.querySelector('#currentTime')

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
  ],
}

const playerInst = new Audio()

// Создаём класс Itunes
class Itunes {
  constructor(data, player) {
    this.data = data
    this.playing = 0
    this.player = player
    this.player.volume = 0.8
    this.player.currentTime = 0
  }

  playTrack(id) {
    this.player.src = this.data.albums[id].trackPath
    this.player.currentTime = this.currentTimeTrack
    this.player.play()
    console.log('this.playingTrack', this.playingTrack)
    console.log('Playing:', this.playing)
    this.updateCurrentTimeTrack()
    console.log(this.player)
    console.log('This volume track', this.player.volume)
  }

  pauseTrack() {
    this.player.pause()
    console.log(this.player.currentTime)
  }

  switchTrack(id) {
    this.playTrack(id)
    console.log('itunes.GetplayingTrack in switchTrack:', this.playingTrack)
    console.log(this.player.src)
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
    return (this.player.currentTime = value)
  }

  updateCurrentTimeTrack() {
    setInterval(() => {
      let minutes = Math.floor(this.player.currentTime / 60)
      minutes = minutes >= 10 ? minutes : '0' + minutes
      let seconds = Math.floor(this.player.currentTime % 60)
      seconds = seconds >= 10 ? seconds : '0' + seconds

      console.log(this.currentTimeTrack, minutes + ':' + seconds)
      divCurrentTime.innerHTML = minutes + ':' + seconds
    }, 1000)
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
  itunes.playingTrack = itunes.playingTrack - 1
  itunes.currentTimeTrack = 0
  itunes.switchTrack(itunes.playingTrack)
})

btnNextTrack.addEventListener('click', function () {
  itunes.playingTrack = itunes.playingTrack + 1
  itunes.currentTimeTrack = 0
  itunes.switchTrack(itunes.playingTrack)
})

inputVolumeTrack.addEventListener('input', function (e) {
  itunes.volumeTrack = e.target.value
})
