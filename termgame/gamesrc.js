(function () {
    //SPRITELOADING STARTS HERE
    //
    //
    var charSprite0 = new Image();
    charSprite0.src = "char0.png";
    charSprite0.onload = function () {
        character.sprites[0] = charSprite0;
        console.log(character);
    };
    var charSprite1 = new Image();
    charSprite1.src = "char1.png";
    charSprite1.onload = function () {
        character.sprites[1] = charSprite1;
        console.log(character);
    };
    var charSprite2 = new Image();
    charSprite2.src = "char2.png";
    charSprite2.onload = function () {
        character.sprites[2] = charSprite2;
        console.log(character);
    };
    var charSprite3 = new Image();
    charSprite3.src = "char3.png";
    charSprite3.onload = function () {
        character.sprites[3] = charSprite3;
        console.log(character);
    };
    var enSprite0 = new Image();
    enSprite0.src = "en0.png";
    enSprite0.onload = function () {
        enemy.sprites[0] = enSprite0;
        console.log(enemy);
    };
    var enSprite1 = new Image();
    enSprite1.src = "en1.png";
    enSprite1.onload = function () {
        enemy.sprites[1] = enSprite1;
        console.log(enemy);
    };
    var enSprite2 = new Image();
    enSprite2.src = "en2.png";
    enSprite2.onload = function () {
        enemy.sprites[2] = enSprite2;
        console.log(enemy);
    };
    var enSprite3 = new Image();
    enSprite3.src = "en3.png";
    enSprite3.onload = function () {
        enemy.sprites[3] = enSprite3;
        console.log(enemy);
    };
    var bulSprite0 = new Image();
    bulSprite0.src = "bul0.png";
    bulSprite0.onload = function () {
        bullet.sprites[0] = bulSprite0;
        console.log(bullet);
    };
    var bulSprite1 = new Image();
    bulSprite1.src = "bul1.png";
    bulSprite1.onload = function () {
        bullet.sprites[1] = bulSprite1;
        console.log(bullet);
    };
    var bulSprite2 = new Image();
    bulSprite2.src = "bul2.png";
    bulSprite2.onload = function () {
        bullet.sprites[2] = bulSprite2;
        console.log(bullet);
    };
    var bulSprite3 = new Image();
    bulSprite3.src = "bul3.png";
    bulSprite3.onload = function () {
        bullet.sprites[3] = bulSprite3;
        console.log(bullet);
    };
    var tileSprite = new Image();
    tileSprite.src = "tile.png";
    tileSprite.onload = function () {
        tile.sprites[0] = tileSprite;
    };
    //
    //
    //SPRITELOADING ENDS HERE
    //VARIABLES START HERE
    //
    //
    var fireCoolDown = 0;
    var canvas = $('#gC')[0];
    var dimension = [document.documentElement.clientWidth, document.documentElement.clientHeight];
    canvas.width = dimension[0] - 20;
    canvas.height = dimension[1] - 30;
    var ctx = canvas.getContext("2d");
    var keysdown = [];
    var frameNo = 0;
    console.log(frameNo);
    var character = {
        sprites: [],
        x: 0,
        y: 0,
        direction: 1,
        width: 64,
        height: 64,
        ammo: 10
    };
    var tile = {
        sprites: []
    };
    var enemy = {
        sprites: []
    };
    var enemyCooldown = 100;
    var enemies = [{
        x: -1000,
        y: canvas.height + 128,
        direction: 2,
        width: 64,
        height: 64,
        speed: 0
        }];
    var bullet = {
        sprites: []
    };
    var bullets = [
        {
            x: canvas.height / 2,
            y: canvas.width / 2,
            direction: 3,
            width: 32,
            height: 32
        }
    ];
    var reloadTime = 100;

    function isCollide(a, b) {
        return !(
            ((a.y + a.height) < (b.y)) ||
            (a.y > (b.y + b.height)) ||
            ((a.x + a.width) < b.x) ||
            (a.x > (b.x + b.width))
        );
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    //
    //
    //VARIABLES END HERE
    //DRAWING STARTS HERE
    //
    //
    var draw = function () {
        canvas.height = canvas.height;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
        for (var i = 0; i < (canvas.width / 64) + 1; i++) {
            for (var e = 0; e < (canvas.height / 64) + 1; e++) {
                var x = i * 64;
                var y = e * 64;
                ctx.drawImage(tile.sprites[0], x, y, 64, 64);
            }
        }
        for (var i in enemies) {
            var dir = enemies[i].direction;
            var x = enemies[i].x;
            var y = enemies[i].y;
            ctx.drawImage(enemy.sprites[dir], x, y, 64, 64);
        }
        for (var i in bullets) {
            var dir = bullets[i].direction;
            var x = bullets[i].x;
            var y = bullets[i].y;
            ctx.drawImage(bullet.sprites[dir], x, y, 32, 32);
        }
        ctx.drawImage(character.sprites[character.direction], character.x, character.y, 64, 64);
    };
    window.draw = draw;
    //
    //
    //DRAWING ENDS HERE
    //GAMELOOP STARTS HERE
    //
    //
    var frame = function () {
        enemyCooldown--;
        fireCoolDown--;
        frameNo++;
        if (keysdown[37]) { //left arrow
            character.direction = 3;
            if (character.x >= 12) {
                character.x -= 10;
            }
        }
        if (keysdown[38]) { //up arrow
            character.direction = 0;
            if (character.y >= 12) {
                character.y -= 10;
            }
        }
        if (keysdown[39]) { //right arrow
            character.direction = 1;
            if (character.x <= canvas.width - 76) {
                character.x += 10;
            }
        }
        if (keysdown[40]) { //down arrow
            character.direction = 2;
            if (character.y <= canvas.height - 76) {
                character.y += 10;
            }
        }
        if (keysdown[70]) { //f key
            if (fireCoolDown <= 0) {
                fireCoolDown = 10;
                if (character.direction == 0) {
                    bullets.push({
                        x: character.x,
                        y: character.y,
                        width: 32,
                        height: 32,
                        direction: 3
                    });
                } else if (character.direction == 1) {
                    bullets.push({
                        x: character.x,
                        y: character.y,
                        width: 32,
                        height: 32,
                        direction: 0
                    });
                } else if (character.direction == 2) {
                    bullets.push({
                        x: character.x,
                        y: character.y,
                        width: 32,
                        height: 32,
                        direction: 1
                    });
                } else if (character.direction == 3) {
                    bullets.push({
                        x: character.x,
                        y: character.y,
                        width: 32,
                        height: 32,
                        direction: 2
                    });
                }
            }
        };
        if (enemyCooldown <= 0) {
            enemies.push({
                x: getRandomInt(128, canvas.width - 128),
                y: getRandomInt(128, canvas.height - 128),
                width: 64,
                height: 64,
                direction: 0
            });
            enemyCooldown = getRandomInt(30, 100);
        }

        for (var i in bullets) { //bullet movement
            var dir = bullets[i].direction;
            if (dir == 0) {
                bullets[i].x += 30;
            } else if (dir == 1) {
                bullets[i].y += 30;
            } else if (dir == 2) {
                bullets[i].x -= 30;
            } else if (dir == 3) {
                bullets[i].y -= 30;
            }
            for (var e in enemies) {
                if (isCollide(bullets[i], enemies[e])) {
                    delete enemies[e];
                    delete bullets[i];
                }
            }
        }
        for (var i in enemies) { //enemy AI
            var n0 = Math.round((Math.random()));
            var n1 = Math.round((Math.random()));
            var n2 = Math.round((Math.random()));
            console.log(n0);
            console.log(n1);
            console.log(n2);
            if (n0 == 1 && enemies[i].speed != 0) {
                var d = Math.floor((Math.random() * 3));
                enemies[i].direction = d;
                if (n1 == 1) {
                    if (enemies[i].x < character.x) {
                        if (n2 = 1) {
                            enemies[i].x += 30;
                        } else {
                            enemies[i].x += Math.abs(enemies[i].x - character.x) % 30;
                        }
                    } else if (enemies[i].x > character.x) {
                        if (n2 = 1) {
                            enemies[i].x -= 30;
                        } else {
                            enemies[i].x -= Math.abs(enemies[i].x - character.x) % 30;
                        }
                    }
                } else {
                    if (enemies[i].y < character.y) {
                        if (n2 = 1) {
                            enemies[i].y += 30;
                        } else {
                            enemies[i].y += Math.abs(enemies[i].y - character.y) % 30;
                        }
                    } else if (enemies[i].y > character.y) {
                        if (n2 = 1) {
                            enemies[i].y -= 30;
                        } else {
                            enemies[i].y -= Math.abs(enemies[i].y - character.y) % 30;
                        }
                    }
                }
                if (isCollide(character, enemies[i])) {
                    alert("You dyed!!?!");
                    location.reload();
                }
            }
            draw();
        }
    };
    setInterval(frame, 50);
    //
    //
    //GAMELOOP ENDS HERE
    //KEYEVENTS START HERE
    //
    //
    $(document).keydown(function (e) {
        keysdown[e.keyCode] = true;
        console.log(e.keyCode + " DOWN");
    });
    $(document).keyup(function (e) {
        keysdown[e.keyCode] = false;
        console.log(e.keyCode + " UP");
    });
})();