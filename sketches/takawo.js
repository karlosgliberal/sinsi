export const takawo = p => {
  let code, str;
  let ns = 1000,
    rs = 1000;
  let m;

  p.state = {};
  p.dispatch = () => {};

  p.setup = () => {
    console.log(p.state);
    code = '+++..+++...+++++++++..+.++.+.+.+.+.+.+.+.+......++++++++';
    p.createCanvas(820, 130);
    p.colorMode(p.HSB, 360, 100, 100, 100);

    p.angleMode(p.DEGREES);
    p.textFont('monospace');
    for (let s of code) {
      str += s;
      str += '\n';
    }
    p.frameRate(4);
  };

  p.draw = () => {
    p.background('#16242D');
    p.randomSeed(rs);
    p.noiseSeed(ns);
    p.fill('#E204E6');
    let w = p.sqrt(p.sq(p.width) + p.sq(p.height));
    m = p.frameCount % str.length;
    p.push();
    p.translate(p.width / 2, p.height / 2);
    // rotate(int(random(8)) * 360 / 8);
    separateGrid(-w / 2, -w / 2, w);
    p.pop();

    if (p.frameCount % 100 == 0) {
      ns = p.random(500, 2000);
      rs = p.random(500, 2000);
    }
    // noLoop();
  };

  const separateGrid = (x, y, d) => {
    let sepNum = p.int(p.random(1, 4));
    let w = d / sepNum;
    for (let i = x; i < x + d - 1; i += w) {
      for (let j = y; j < y + d - 1; j += w) {
        let n = p.noise(i / ns, j / ns, p.frameCount / ns);
        if (n > 0.25 && d > p.width / 10) {
          separateGrid(i, j, w);
        } else {
          p.push();
          p.translate(i + w / 2, j + w / 2);
          p.rotate((p.int(p.random(8)) * 360) / 8);
          p.textSize(w * 0.4);
          p.textAlign(p.CENTER, p.CENTER);
          p.text(str.substr(m, 1), 0, 0);
          m = (m + 1) % str.length;
          p.pop();
        }
      }
    }
  };
};
