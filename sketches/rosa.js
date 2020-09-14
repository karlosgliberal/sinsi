export const rosa = p => {
  p.state = {};
  p.dispatch = () => {};
  let steps, from, to, w, h;
  let c = 0;

  p.setup = () => {
    from = p.color('#16242D');
    to = p.color('#16242D');
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
    if (p.state.color == 'rosa') {
      from = p.color('#6C03AB');
      to = p.color('#F0A2E8');
    } else if (p.state.color == 'morado') {
      from = p.color('#FE72D4');
      to = p.color('#00EFF8');
    } else if (p.state.color == 'azul') {
      from = p.color('#1233C1');
      to = p.color('#A1FFDD');
    } else {
      from = p.color('#16242D');
      to = p.color('#16242D');
    }

    for (let i = 0; i < steps; i++) {
      p.fill(p.lerpColor(from, to, (1 / steps) * i));
      p.rect(0, i * h, p.width, h);
    }

    let s = 12 + p.state.text.length;

    p.textSize(s);
    c += 2e-4;
    let mx = p.mouseX * 1e-3;
    let my = p.mouseY * 1e-3;
    p.fill('#ffffff');
    for (let i = 0; i < 900 / s; i++) {
      for (let j = 0; j < 200 / s; j++) {
        p.text(
          String.fromCharCode(
            // p.int(p.noise(i * 0.02 + mx, j * 0.02 - my, c) * 70) + 2000
            p.int(p.noise(i * 0.02 + mx, j * 0.02 - my, c) * 70) + 2000
          ),
          i * s,
          j * s
        );
      }
    }

    // noLoop();
  };

  p.windowResized = () => {
    p.resizeCanvas(p.state.widthCanvasWrapper - 20, 130);
  };
};
