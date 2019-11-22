var Breakout = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Breakout ()
    {
        Phaser.Scene.call(this, { key: 'breakout' });

        this.bricks;
        this.paddle;
        // this.ball;
    },

    preload: function ()
    {
        this.load.atlas('assets', 'wall/the_wall.png', 'wall/the_wall_atlas.json');
        this.load.audio("music", ["sounds/soviet-march.ogg"]);
        this.load.audio("breakbrick", ["sounds/breakbrick.ogg"]);
        this.load.audio("explosion", ["sounds/explosion.ogg"]);
        this.load.audio("hitguard", ["sounds/hitguard.ogg"]);
        this.load.audio("intercept", ["sounds/intercept.ogg"]);
    },

    create: function ()
    {
        this.music = this.sound.add("music");

    var musicConfig = {
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0
}

this.music.play(musicConfig);

        //  Enable world bounds, but disable the wall and floor
        this.physics.world.setBoundsCollision(true, true, false, false);

        let gridHeight = 6;
        let gridWidth = 12;

        //  Create the bricks in a 10x6 grid
        this.bricks = this.physics.add.staticGroup({
            key: 'assets',
            frame: 'brick',
            frameQuantity: gridHeight*gridWidth,
            gridAlign: { width: gridWidth, height: gridHeight, cellWidth: 64, cellHeight: 32, x: 32, y: 16 },
        });

        // Create balls 
        this.ballsGroup = this.physics.add.group();
        for(let i=0; i < 10; i++){
            this.ballPool = this.ballsGroup.create(0, 0, 'assets', 'bomb').setCollideWorldBounds(true);
            this.placeBalls();
        }
        


        // this.ball = this.physics.add.image(400, 500, 'assets', 'bomb').setCollideWorldBounds(true).setBounce(1);
        // this.ball.setData('onPaddle', true);

        this.paddle = this.physics.add.image(400, (gridHeight+1)*32, 'assets', 'guards').setImmovable();

        //  Our colliders
        this.physics.add.collider(this.balls, this.bricks, this.hitBrick, null, this);
        this.physics.add.collider(this.balls, this.paddle, this.hitPaddle, null, this);

        //  Input events
        this.input.on('pointermove', function (pointer) {

            //  Keep the paddle within the game
            this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);

            // if (this.ball.getData('onPaddle'))
            // {
            //     this.ball.x = this.paddle.x;
            // }

        }, this);

        this.input.on('pointerup', function (pointer) {

            // if (this.ball.getData('onPaddle'))
            // {
            //     this.ball.setVelocity(-75, -300);
            //     this.ball.setData('onPaddle', false);
            // }

        }, this);
    },

    addBalls: function()
    {

         
    },

    placeBalls: function()
    {
     this.ballPool.y = config.height;
     this.ballPool.x = Phaser.Math.Between(0, config.width);
    //  this.ballPool.setVelocity(75, 300);
    },

    // hitBrick: function (ball, brick)
    // {
    //     brick.disableBody(true, true);

    //     if (this.bricks.countActive() === 0)
    //     {
    //         this.resetLevel();
    //     }
    // this.breakbrick = this.sound.add("breakbrick");
    // this.name.play();
    //     // ball.disableBody(true, true);
    // },

    resetBall: function ()
    {
        // this.ball.setVelocity(0);
        // this.ball.setPosition(this.paddle.x, 500);
        // this.ball.setData('onPaddle', true);
    },

    resetLevel: function ()
    {
        this.resetBall();

        this.bricks.children.each(function (brick) {
            brick.setOrigin(0,0);

            brick.enableBody(false, 0, 0, true, true);

        });
    },

    // hitPaddle: function (ball, paddle)
    // {
    //     ball.disableBody(true, true);
    // },

    update: function ()
    {
        // if (this.ball.y > 600)
        // {
        //     this.resetBall();
        // }
    }

});

var config = {
    type: Phaser.WEBGL,
    width: 768,
    height: 600,
    parent: 'phaser-example',
    scene: [ Breakout ],
    physics: {
        default: 'arcade'
    },
    backgroundColor: '#e2e2e2'
};

var game = new Phaser.Game(config);