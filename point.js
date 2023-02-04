import { getRGB } from "./function.js";

export class Point {
  constructor(x, y, size) {
    this.fixX = x;
    this.fixY = y;
    this.x = x;
    this.y = y;
    this.size = size;
    this.isMove = false;
    this.farRatio = 0;
  }
  update({ pointerX, pointerY, mouseThickness, sparkLevel, comebackSpeed }) {
    const px = this.x - pointerX;
    const py = this.y - pointerY;
    const fixPX = this.fixX - this.x;
    const fixPY = this.fixY - this.y;
    const farRatio =
      Math.sqrt(fixPX * fixPX + fixPY * fixPY) / mouseThickness / 1 > 1
        ? 1
        : Math.sqrt(fixPX * fixPX + fixPY * fixPY) / mouseThickness / 1;

    const theta = Math.atan2(py, px);
    const dx = mouseThickness * Math.cos(theta) - px;
    const dy = mouseThickness * Math.sin(theta) - py;

    const backTick = 1 + comebackSpeed * 0.01;

    if (Math.sqrt(px * px + py * py) < mouseThickness + 1) {
      this.x += dx * sparkLevel;
      this.y += dy * sparkLevel;
    } else {
      this.x = (this.x - this.fixX) / backTick + this.fixX;
      this.y = (this.y - this.fixY) / backTick + this.fixY;
    }

    if (farRatio < 0.1) {
      this.isMove = false;
    } else {
      this.isMove = true;
    }

    this.farRatio = farRatio;
  }

  draw({
    top,
    left,
    ctx,
    pointerX,
    pointerY,
    mouseThickness,
    sparkLevel,
    comebackSpeed,
    color,
    flyingDotColor,
  }) {
    // if (color[0] !== "#" || color.length !== 7) return;
    if (this.size === 0) return;
    ctx.beginPath();

    const rgb = getRGB(color);

    const dotrgb = getRGB(flyingDotColor);

    const dotRatioRGB = dotrgb.map((v, i) => (v - rgb[i]) * this.farRatio + rgb[i]);

    if (this.isMove) {
      ctx.fillStyle = `rgb(${dotRatioRGB[0]},${dotRatioRGB[1]},${dotRatioRGB[2]})`;
      // ctx.fillStyle = `rgb(0,0,0)`;
    } else {
      ctx.fillStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
    }

    this.update({ pointerX, pointerY, mouseThickness, sparkLevel, comebackSpeed });

    // ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
    ctx.fillRect(left + this.x, top + this.y, this.size, this.size);

    // ctx.fill();
  }
}
