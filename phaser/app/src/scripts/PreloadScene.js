import Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    // imgs
    this.load.atlas('icons', './assets/images/icons.png', './assets/images/icons.json');

    this.load.spritesheet('window', './assets/images/window.png', {
      frameWidth: 1513,
      frameHeight: 1311,
    });

    this.load.spritesheet('gameBg', './assets/images/gameBg.png', {
      frameWidth: 525,
      frameHeight: 600,
    });
    this.load.image('startBtn', './assets/images/startBtn.png');
    this.load.image('stopBtn', './assets/images/stopBtn.png');

    // sounds
    this.load.audio('startGame', './assets/audio/start-button.ogg');
    this.load.audio('stopGame', './assets/audio/stop-button.ogg');
    this.load.audio('theme', './assets/audio/theme.ogg');
  }

  create() {
    this.add.text(20, 20, 'Loading game...', { fontFamily: 'Arial, sans-serif' });
    this.scene.start('GameScene');
  }
}
