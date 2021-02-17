import Phaser from 'phaser';

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
      duration: 4000,
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

  create() {
    this.spin = [];
    console.log('create game scene');
    this.cameras.main.setBackgroundColor('rgb(34,139,34)');
    this.addAnims();

    this.slider1 = this.add.sprite(138, 0, 'icons', 0);
    this.slider2 = this.add.sprite(265, 0, 'icons', 0);
    this.slider3 = this.add.sprite(392, 0, 'icons', 0);

    this.input.keyboard.on('keydown-SPACE', () => {
      this.startAnims(this.slider1, 15);
      this.startAnims(this.slider2, 10);
      this.startAnims(this.slider3, 20);
    }, this);

    this.input.keyboard.on('keydown-P', () => {
      if (this.slider1.anims.isPaused || this.slider2.anims.isPaused || this.slider3.anims.isPaused) {
        this.slider1.anims.resume();
        this.slider2.anims.resume();
        this.slider3.anims.resume();
      } else {
        // console.log(this.slider1.anims.timeScale);
        // this.slider1.anims.stop();
        // this.slider2.anims.stop();
        // this.slider3.anims.stop();
        this.stopAnims(this.slider1);
        this.stopAnims(this.slider2);
        this.stopAnims(this.slider3);

        // const frame1 = this.slider1.anims.currentFrame.index;
        // const frame2 = this.slider2.anims.currentFrame.index;
        // const frame3 = this.slider3.anims.currentFrame.index;

        // if (frame1 % 4 === 0) {
        //   this.slider1.anims.nextFrame();
        // } else if (frame1 % 4 === 2) {
        //   this.slider1.anims.nextFrame();
        //   this.slider1.anims.nextFrame();
        //   this.slider1.anims.nextFrame();
        // } else if (frame1 % 4 === 3) {
        //   this.slider1.anims.nextFrame();
        //   this.slider1.anims.nextFrame();
        // }

        // if (frame2 % 4 === 0) {
        //   this.slider2.anims.nextFrame();
        // } else if (frame2 % 4 === 2) {
        //   this.slider2.anims.nextFrame();
        //   this.slider2.anims.nextFrame();
        //   this.slider2.anims.nextFrame();
        // } else if (frame2 % 4 === 3) {
        //   this.slider2.anims.nextFrame();
        //   this.slider2.anims.nextFrame();
        // }

        // if (frame3 % 4 === 0) {
        //   this.slider3.anims.nextFrame();
        // } else if (frame3 % 4 === 2) {
        //   this.slider3.anims.nextFrame();
        //   this.slider3.anims.nextFrame();
        //   this.slider3.anims.nextFrame();
        // } else if (frame3 % 4 === 3) {
        //   this.slider3.anims.nextFrame();
        //   this.slider3.anims.nextFrame();
        // }
      }
    }, this);

    // test next frame
    this.input.keyboard.on('keydown-N', () => {
      this.slider1.anims.nextFrame();
    });

    // ускорение и замедление
    // this.tweens.add({
    //   targets: this.slider1.anims,
    //   timeScale: { from: 0.5, to: 2 },
    //   ease: 'Sine.inOut',
    //   // yoyo: true,
    //   repeat: -1,
    //   repeatDelay: 1000,
    //   // hold: 1000,
    //   duraton: 2000,
    // });

    this.window = this.add.sprite(0, 60, 'window').setOrigin(0, 0).setScale(0.35).setAlpha(0.3);
  }

  // update() {
  //   // console.log('update');
  // }
}
