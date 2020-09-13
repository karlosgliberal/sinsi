export const rosa = p => {
  p.state = {};
  p.dispatch = () => {};
  let steps, from, to, w, h;

  p.setup = () => {
    from = p.color('#6C03AB');
    to = p.color('#F0A2E8');
    steps = 30;
    w = 200 / steps;
    h = 200 / steps;

    p.createCanvas(p.state.widthCanvasWrapper - 20, 200);
    p.background(51);
    p.noStroke();
  };

  p.draw = () => {
    if (p.state.widthCanvasWrapper == 0) {
      p.dispatch();
      p.resizeCanvas(p.state.widthCanvasWrapper - 20, 130);
    }
    for (let i = 0; i < steps; i++) {
      //fill(lerpColor(from, to, (1 / steps) * i))
      //rect(i * w, 0, w, height)
      p.fill(p.lerpColor(from, to, (1 / steps) * i));
      p.rect(0, i * h, p.width, h);
    }
    // noLoop();
  };

  p.windowResized = () => {
    p.resizeCanvas(p.state.widthCanvasWrapper - 20, 130);
  };
};
