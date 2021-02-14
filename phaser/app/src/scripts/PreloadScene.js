import Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    // this.load.spritesheet('spin', './assets/images/spin.png', {
    //   frameWidth: 105,
    //   frameHeight: 1508,
    // });

    this.load.atlas('icons', './assets/images/icons.png', './assets/images/icons.json');
    // this.load.a

    this.load.spritesheet('window', './assets/images/window.png', {
      frameWidth: 1513,
      frameHeight: 1311,
    });
  }

  create() {
    const text = this.add.text(20, 20, 'Loading game...', { fontFamily: 'Dimbo' });
    this.scene.start('GameScene');
    console.log(text.text);
  }
}
