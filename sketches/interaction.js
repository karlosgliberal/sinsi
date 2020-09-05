export const interaction = p => {
  p.state = {};
  p.disoatch = () => {};

  const myCircle = (x, y, d) => {
    let r = d * 0.5;
    p.beginShape();
    for (let i = 0; i < p.TAU; i += p.TAU / 360) {
      let xx = x + r * p.cos(i);
      let yy = y + r * p.sin(i);
      let pp = res(xx, yy);
      p.curveVertex(pp.x, pp.y);
    }
    p.endShape(p.CLOSE);
  };

  const res = (x, y) => {
    let pp = p.createVector(x, y);
    let scl = 0.0001;
    let ang = p.noise(pp.x * scl, pp.y * scl, pp.frameCount * 0.001) * 200;
    let off = p.noise(pp.x * scl, pp.y * scl, pp.frameCount * 0.001) * 50;
    pp.x += p.cos(ang) * off;
    pp.y += p.sin(ang) * off;

    return pp;
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, 200);
  };

  p.draw = () => {
    let x = p.width / 2;
    let y = p.height / 2;
    let d = 300;
    p.background(255);
    p.drawingContext.shadowColor = '#000000';
    p.drawingContext.shadowBlur = d;
    p.fill(225);
    p.noStroke();
    p.rect(10, 10 + p.frameCount, 10, 10);
    myCircle(x, y, d);
  };
};
