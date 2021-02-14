import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    this.spin = [];
    console.log('create game scene');
    this.cameras.main.setBackgroundColor('rgb(34,139,34)');

    this.slider1 = this.add.sprite(138, 0, 'icons', 0);
    this.slider2 = this.add.sprite(265, 0, 'icons', 0);
    this.slider3 = this.add.sprite(392, 0, 'icons', 0);
    
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
    
    this.input.keyboard.on('keydown-SPACE', () => {
      this.slider1.play({ key: 'spin' });
      this.slider2.play({ key: 'spin', frameRate: '24' });
      this.slider3.play({ key: 'spin' });
    }, this);
    
    this.input.keyboard.on('keydown-P', () => {
      if (this.slider1.anims.isPaused || this.slider2.anims.isPaused || this.slider3.anims.isPaused) {
        this.slider1.anims.resume();
        this.slider2.anims.resume();
        this.slider3.anims.resume();
      } else {
        this.slider1.anims.stop();
        this.slider2.anims.stop();
        this.slider3.anims.stop();
        const frame1 = this.slider1.anims.currentFrame.index;
        const frame2 = this.slider2.anims.currentFrame.index;
        const frame3 = this.slider3.anims.currentFrame.index;

        if (frame1 % 4 === 0) {
          console.log(`s1e0: ${frame1}`);
          this.slider1.anims.nextFrame();
        } else if (frame1 % 4 === 2) {
          console.log(`s1e2: ${frame1}`);
          this.slider1.anims.nextFrame();
          this.slider1.anims.nextFrame();
          this.slider1.anims.nextFrame();
          console.log(this.slider1.anims.currentFrame.index);
        } else if (frame1 % 4 === 3) {
          console.log(`s1e3: ${frame1}`);
          this.slider1.anims.nextFrame();
          this.slider1.anims.nextFrame();
          console.log(this.slider1.anims.currentFrame.index);
        }
        console.log(`s1 any: ${frame1}`);

        if (frame2 % 4 === 0) {
          this.slider2.anims.nextFrame();
        } else if (frame2 % 4 === 2) {
          this.slider2.anims.nextFrame();
          this.slider2.anims.nextFrame();
          this.slider2.anims.nextFrame();
        } else if (frame2 % 4 === 3) {
          this.slider2.anims.nextFrame();
          this.slider2.anims.nextFrame();
        }

        if (frame3 % 4 === 0) {
          this.slider3.anims.nextFrame();
        } else if (frame3 % 4 === 2) {
          this.slider3.anims.nextFrame();
          this.slider3.anims.nextFrame();
          this.slider3.anims.nextFrame();
        } else if (frame3 % 4 === 3) {
          this.slider3.anims.nextFrame();
          this.slider3.anims.nextFrame();
        }
      }
    }, this);

    // test next frame
    this.input.keyboard.on('keydown-N', () => {
      // const frame1 = this.slider1.anims.currentFrame.index;
      // console.log(`1${frame1}`);
      console.log(this.slider1.anims.currentFrame.index);
      this.slider1.anims.nextFrame();
      console.log(this.slider1.anims.currentFrame.index);
    });

    // ускорение и замедление
    this.tweens.add({
      targets: this.slider1.anims,
      timeScale: { from: 0.8, to: 2 },
      ease: 'Sine.inOut',
      // yoyo: true,
      repeat: -1,
      repeatDelay: 1000,
      hold: 1000,
      duraton: 3000,
    });

    this.tweens.add({
      targets: this.slider2.anims,
      timeScale: { from: 0.8, to: 2 },
      ease: 'Sine.inOut',
      // yoyo: true,
      repeat: -1,
      repeatDelay: 1000,
      hold: 1000,
      duraton: 3000,
    });

    this.tweens.add({
      targets: this.slider3.anims,
      timeScale: { from: 0.8, to: 2 },
      ease: 'Sine.inOut',
      // yoyo: true,
      repeat: -1,
      repeatDelay: 1000,
      hold: 1000,
      duraton: 3000,
    });

    this.window = this.add.sprite(0, 60, 'window').setOrigin(0, 0).setScale(0.35).setAlpha(0.3);
  }

  // update() {
  //   // console.log('update');
  // }
}
