export const simbols = p => {
  let colors = ['#e2e8f0', '#ffffff'];
  p.state = {};
  p.dispatch = () => {};

  p.setup = () => {
    p.createCanvas(670, 200);
    p.rectMode(p.CENTER);

    p.stroke(0);
    p.translate(p.width / 2, p.height / 2);
    p.scale(0.8);
    p.translate(-p.width / 2, -p.height / 2);
    grid();
  };

  p.mouseClicked = () => {
    grid();
    p.dispatch('p5');
  };

  const grid = () => {
    let seg = p.int(p.random(5, 20));
    let w = p.width / seg;
    for (let i = 0; i < seg; i++) {
      for (let j = 0; j < seg; j++) {
        let x = i * w + w / 2;
        let y = j * w + w;
        let rnd = p.int(p.random(3));
        if (p.random() < 0.5) {
          if (rnd == 0) p.line(x - w / 2, y, x - w / 2, y - w);
          if (rnd == 1) p.line(x + w / 2, y, x + w / 2, y - w);
          p.line(x - w / 2, y, x + w / 2, y);
          randomShape(x, y, w);
        }
      }
    }
  };

  const randomShape = (x, y, s) => {
    let rnd = p.int(p.random(6));
    let hs = s / 2;
    p.shuffle(colors, true);
    let col1 = colors[0];
    let col2 = colors[1];
    let pn = p.random() < 0.5 ? -1 : 1;
    p.push();
    p.translate(x, y);
    p.fill(col1);
    if (rnd == 0) {
      p.square(0, -hs / 2, hs);
      p.fill(col2);
      p.circle(0, -hs / 2, hs * 0.7);
    }
    if (rnd == 1) {
      p.rect(hs * 0.2 * pn, -hs * 0.5, hs * 0.6, hs);
      p.fill(col2);
      p.rect(-hs * 0.2 * pn, -hs * 0.3, hs * 0.6, hs * 0.6);
    }
    if (rnd == 2) {
      p.line(0, 0, 0, -hs);
      p.triangle(0, -hs, hs * 0.5 * pn, -hs * 0.75, 0, -hs * 0.5);
      p.fill(col2);
      p.circle(0, -hs - s * 0.05, s * 0.1);
    }
    if (rnd == 3) {
      p.line(s * 0.08 * pn, 0, s * 0.08 * pn, -s * 0.1);
      p.line(-s * 0.01 * pn, 0, -s * 0.01 * pn, -s * 0.1);
      p.beginShape();
      p.vertex(s * 0.1, -s * 0.1);
      p.vertex(-s * 0.1, -s * 0.1);
      p.vertex(s * 0.1 * pn, -hs + s * 0.05);
      p.endShape(p.CLOSE);
      p.fill(col2);
      p.circle(s * 0.075 * pn, -hs * 0.95, s * 0.18);
    }
    if (rnd == 4) {
      p.line(0, 0, 0, -hs);
      p.line(0, 0, hs * 0.75, -hs * 0.75);
      p.line(0, 0, -hs * 0.75, -hs * 0.75);
      p.arc(0, 0, hs, hs, p.PI, p.TAU);
    }
    if (rnd == 5) {
      p.line(0, 0, 0, -hs);
      p.line(-hs * 0.3, -hs * 0.7, hs * 0.3, -hs * 0.7);
      p.beginShape();
      p.vertex(s * 0.2, 0);
      p.vertex(-s * 0.2, 0);
      p.vertex(0, -hs * 0.3);
      p.endShape(p.CLOSE);
    }
    p.pop();
  };
};
