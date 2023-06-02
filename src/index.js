import './main.sass'
// Сделать local storage
// Стилизовать

// Получаем все DOM элементы
const player = new Audio()
const btnPlay = document.querySelector('#play')
const btnPause = document.querySelector('#pause')
const btnPrevTrack = document.querySelector('#prevTrack')
const btnNextTrack = document.querySelector('#nextTrack')

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
    this.volume
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
    if (player.paused) {
      console.log('Переключаемся и играем дальше')
      this.playTrack(id)
    } else {
      console.log('Переключаемся и не играем')
      this.pauseTrack()
    }
    console.log('itunes.GetPlayingTrack in switchTrack:', this.PlayingTrack)
    console.log(player)
  }

  get PlayingTrack() {
    return this.playing
  }
  set PlayingTrack(id) {
    return (this.playing = id)
  }
}

// Создаём инстанс класса Itunes
const itunes = new Itunes(data)

// Создаём методы для работы с инстансом класса Itunes
btnPlay.addEventListener('click', function () {
  itunes.playTrack(0)
})

btnPause.addEventListener('click', function () {
  itunes.pauseTrack()
})

btnPrevTrack.addEventListener('click', function () {
  itunes.PlayingTrack = itunes.PlayingTrack - 1
  itunes.switchTrack(itunes.PlayingTrack)
  console.log(itunes.PlayingTrack)
})

btnNextTrack.addEventListener('click', function () {
  itunes.PlayingTrack = itunes.PlayingTrack + 1
  itunes.switchTrack(itunes.PlayingTrack)
  console.log(itunes.PlayingTrack)
})
