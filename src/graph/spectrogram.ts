export class Spectrogram {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.width = 0;
    this.height = 0;
  }

  public initSize(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.ctx.fillStyle = "#000000";
    this.ctx.beginPath();
    this.ctx.rect(0, 0, width, height);
    this.ctx.fill();
  }

  public draw() {}
}
