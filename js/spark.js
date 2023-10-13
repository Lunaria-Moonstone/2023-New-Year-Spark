// document.onclick = function(evt) {
//     let e = evt || window.event;
//     fnFire({
//         x: e.pageX,
//         y: e.pageY,
//     });
// }

setInterval("autoFire()", "500"); 

function autoFire() {
    let w = document.documentElement.clientWidth;
    let h = document.documentElement.clientHeight;

    fnFire({
        x: randInt(0, w),
        y: randInt(0, h),
    });
}

function fnFire(target) {
    let div = document.createElement('div');
    div.className = 'fire';

    div.style.left = target.x + 'px';
    div.style.top = document.documentElement.clientHeight - 50 + 'px';

    document.body.appendChild(div);
    sport(div, {left: target.x, top: target.y}, () => {
        div.remove();
        boom(target);
    });
}

function boom(target) {
    let num = randInt(50, 80);
    for(let i = 0; i < num; i += 1) {
        new Spark(target);
    }
}

class Spark {
    constructor(target) {
        this.target = target;
        this.ele = document.createElement('div');

        this.init();
    }
    init() {
        document.body.appendChild(this.ele);

        this.ele.style.width = randInt(3, 8) + 'px';
        this.ele.style.height = randInt(3, 8) + 'px';
        this.ele.style.backgroundColor = '#' + randInt(0, 0xffffff).toString(16);
        this.ele.style.position = 'absolute';
        this.ele.style.left = this.target.x + 'px';
        this.ele.style.top = this.target.y + 'px';

        this.speed_x = randInt(3, 17) * (Math.random() > 0.5 ? 1 : -1);
        this.speed_y = randInt(3, 17) * (Math.random() > 0.5 ? 1 : -1);

        this.fly();
    }
    fly() {
        this.timer = setInterval(() => {
            this.ele.style.left = this.ele.offsetLeft + this.speed_x + 'px';
            this.ele.style.top = this.ele.offsetTop + this.speed_y ++ + 'px';
            if(this.ele.offsetTop >= document.documentElement.clientHeight) {
                this.ele.remove();
                clearInterval(this.timer);
            }
        }, 30);
    }
}

function randInt(min, max) {
    if(min > max) {
        [min, max] = [max, min];
    }
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}