export const codigos = p => {
  p.state = {};
  p.dispatch = () => {};
  let pos1, pos2, pos3, pg;

  p.setup = () => {
    p.createCanvas(600, 200);
    p.noLoop();
    pos1 = p.createVector(0, 0);
    pos2 = p.createVector(0, 0);
    pos3 = p.createVector(0, 0);
    pg = p.createGraphics(p.width, p.height);
    pg.noStroke();
  };

  p.draw = () => {
    if (p.state.widthCanvasWrapper == 0) {
      p.dispatch();
      p.resizeCanvas(p.state.widthCanvasWrapper - 20, 130);
    }
    p.background('#16242D');
    p.stroke(255);
    let count = 10;
    let s = p.state.widthCanvasWrapper / count;

    for (let i = 0; i < count; i++) {
      katachi(i * s, i, s);
      p.noFill();
      //rect(i * s , i, s, s);
    }
  };

  const katachi = (x, y, s) => {
    //stroke(255,0,0);
    let hs = s / 2;
    p.push();
    p.translate(x + hs, y + hs);
    let a = p.int(p.random(2));
    p.fill('#fff');
    if (a == 1) {
      p.push();
      p.noFill();
      p.stroke(51);
      p.strokeWeight(0.8);
      //fill(51);
      //blendMode(BURN);
      //drawingContext.setLineDash([2, 4]);

      p.drawingContext.setLineDash([0.5, 3]);
      p.ellipse(0, 0, p.random(hs / 2, hs));
      p.fill('#fff');
      p.ellipse(p.random(-5, 5), p.random(-5, 5), p.random(hs / 2, hs));
      p.noFill();
      p.stroke('#fff');
      p.ellipse(p.random(-5, 5), p.random(-5, 5), hs, hs);
      p.pop();
    }
    if (a == 0) {
      pos1.x = p.random(-hs + hs / 5, hs - hs / 5);
      pos1.y = p.random(-hs + hs / 5, hs - hs / 5);

      pos2.x = p.random(-hs + hs / 5, hs - hs / 5);
      pos2.y = p.random(-hs + hs / 5, hs - hs / 5);

      pos3.x = p.random(-hs + hs / 5, hs - hs / 5);
      pos3.y = p.random(-hs + hs / 5, hs - hs / 5);

      p.ellipse(pos1.x, pos1.y, p.random(hs / 4, hs / 10));
      p.ellipse(pos2.x, pos2.y, p.random(hs / 4, hs / 10));
      p.ellipse(pos3.x, pos3.y, p.random(hs / 4, hs / 10));

      for (let j = 0; j < 1; j += 0.1) {
        p.noStroke();
        let c1 = p.createVector(0, 0);
        let c = c1.lerp(pos1, pos2, j);
        p.ellipse(c.x, c.y, 1);

        let d1 = p.createVector(0, 0);
        let d = d1.lerp(pos1, pos3, j);
        p.rect(d.x, d.y, 1);

        let e1 = p.createVector(0, 0);
        let e = e1.lerp(pos3, pos2, j);
        p.ellipse(e.x, e.y, 1);
      }
    }
    p.pop();
  };

  p.windowResized = () => {
    p.resizeCanvas(p.state.widthCanvasWrapper - 20, 130);
  };
};
