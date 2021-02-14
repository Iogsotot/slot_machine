import Phaser from 'phaser';
import PreloadScene from './PreloadScene';
import GameScene from './GameScene';

const config = {
  type: Phaser.CANVAS,
  backgroundColor: '#000000',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 525,
    height: 600,
  },
  scene: [
    PreloadScene,
    GameScene,
  ],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 0 },
    },
  },
};

export default config;
