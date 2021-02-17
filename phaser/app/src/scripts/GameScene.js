import Phaser from 'phaser';
import Button from './Button';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  startAnims(target, frameRate) {
    this.target = target;
    this.frameRate = frameRate;
    this.tweens.add({
      targets: this.target.anims,
      timeScale: { from: 0.2, to: 3 },
      duration: 4000,
    });

    this.target.play({ key: 'spin', frameRate: this.frameRate });
  }

  stopAnims(target) {
    this.currentTimeScale = target.anims.timeScale;
    this.tweens.add({
      targets: target.anims,
      timeScale: { from: this.currentTimeScale, to: 0 },
      duration: 3000,
      onComplete: () => { this.checkFrame(target.anims.currentFrame.index, target); },
    });
  }

  checkFrame(frame, target) {
    this.frame = frame;
    if (this.frame % 4 === 0) {
      target.anims.nextFrame();
    } else if (this.frame % 4 === 2) {
      target.anims.nextFrame();
      setTimeout(() => {
        target.anims.nextFrame();
      }, 270, this);
      setTimeout(() => {
        target.anims.nextFrame();
      }, 540, this);
    } else if (this.frame % 4 === 3) {
      target.anims.nextFrame();
      setTimeout(() => {
        target.anims.nextFrame();
      }, 270, this);
    }
  }

  addAnims() {
    this.anims.create({
      key: 'spin',
      frames: this.anims.generateFrameNames('icons', {
        prefix: 'frame',
        start: 1,
        end: 40,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  gameTimeout() {
    this.timeoutText.setText(`Time: ${this.timeout}`);

    if (this.timeout <= 0) {
      this.gameStop();
      this.timer.remove();
    }
    this.timeout -= 1;
  }

  resetTimer() {
    this.timeout = 20;
    this.timer.remove();
  }

  createAutoStopTimer() {
    this.timer = this.time.addEvent({
      delay: 1000,
      callback: this.gameTimeout,
      callbackScope: this,
      loop: true,
    });
  }

  createText() {
    this.timeoutText = this.add.text(20, 20,
      '',
      {
        fontFamily: 'Arial, sans-serif',
        fontSize: '40px',
      });
  }

  gameStop() {
    this.resetTimer();
    if (this.slider1.anims.isPaused || this.slider2.anims.isPaused || this.slider3.anims.isPaused) {
      this.slider1.anims.resume();
      this.slider2.anims.resume();
      this.slider3.anims.resume();
    } else {
      this.stopAnims(this.slider1);
      this.stopAnims(this.slider2);
      this.stopAnims(this.slider3);
    }
  }

  create() {
    this.timeout = 20;
    this.sounds = {
      startGame: this.sound.add('startGame'),
      stopGame: this.sound.add('stopGame'),
      theme: this.sound.add('theme', { loop: true, volume: 0.4 }),
    };

    this.cameras.main.setBackgroundColor('rgb(255,255,205)');
    this.addAnims();

    this.sounds.theme.play();

    this.slider1 = this.add.sprite(138, 0, 'icons', 0);
    this.slider2 = this.add.sprite(265, 0, 'icons', 0);
    this.slider3 = this.add.sprite(392, 0, 'icons', 0);

    this.gameBg = this.add.sprite(0, 0, 'gameBg').setOrigin(0);
    this.createText();
    this.window = this.add.sprite(0, 60, 'window').setOrigin(0, 0).setScale(0.35);

    this.startBtn = new Button(this, 180, 550, 'startBtn');
    this.stopBtn = new Button(this, 350, 550, 'stopBtn');

    this.startBtn.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      this.sounds.startGame.play();
      this.createAutoStopTimer();
      this.startAnims(this.slider1, 15);
      this.startAnims(this.slider2, 10);
      this.startAnims(this.slider3, 20);
    }, this);

    this.stopBtn.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      this.sounds.stopGame.play();
      this.gameStop();
    }, this);
  }
}
