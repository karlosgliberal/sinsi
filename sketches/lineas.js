export const lineas = p => {
  p.state = {};
  p.dispatch = () => {};

  let rectPosX, rectPosY;
  let rectSize = 10;
  let strokeHue = 0;
  let rota = 45;

  p.setup = () => {
    p.createCanvas(p.state.widthCanvasWrapper - 20, 80);
    p.textAlign(p.CENTER);
    p.rectMode(p.CENTER);
    p.angleMode(p.DEGREES);
    // 1 frame per second
    // p.frameRate(2);
    rectPosX = 0;
    rectPosY = p.height / 2;
    //p.colorMode(p.HSL, 100);
    p.background('#16242D');
  };

  p.draw = () => {
    if (p.state.widthCanvasWrapper == 0) {
      p.dispatch();
      p.resizeCanvas(p.state.widthCanvasWrapper - 20, 80);
      rectPosX = 0;
      rectPosY = p.height / 2;
    }
    // if (p.state.color == 'rosa') {
    //   from = p.color('#6C03AB');
    //   to = p.color('#F0A2E8');
    // } else if (p.state.color == 'morado') {
    //   from = p.color('#FE72D4');
    //   to = p.color('#00EFF8');
    // } else if (p.state.color == 'azul') {
    //   from = p.color('#1233C1');
    //   to = p.color('#A1FFDD');
    // } else {
    //   from = p.color('#16242D');
    //   to = p.color('#16242D');
    // }

    let randomNum = p.round(p.random(1));
    if (p.randomBool(randomNum) === true) {
      rectPosX += rectSize;
      rectPosY += rectSize;
    } else {
      rectPosY -= rectSize;
      rectPosX += rectSize;
    }
    p.translate(rectPosX, rectPosY);
    rota = rota + 45 * randomNum;
    p.rotate(rota);
    p.stroke('#484848');
    p.strokeWeight(1);
    p.rect(0, 0, rectSize, 0);
    // rect(0,0, 0, rectSize);

    if (rectPosX >= p.width) {
      rectPosX = 0;
      strokeHue += 2;
    }

    if (rectPosY > p.height) {
      rectPosY = 0;
    }

    if (rectPosY < 0) {
      rectPosY = p.height;
    }

    if (strokeHue >= 100) {
      strokeHue = 0;
    }

    // noLoop();
  };

  p.randomBool = boleano => {
    var randomNum = boleano;
    var isTrue = true;
    if (randomNum === 1) {
      isTrue = true;
    } else {
      isTrue = false;
    }
    return isTrue;
  };

  p.windowResized = () => {
    p.resizeCanvas(p.state.widthCanvasWrapper - 20, 130);
  };
};
