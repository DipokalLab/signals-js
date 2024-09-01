export class RealtimeChart {
  ctx: CanvasRenderingContext2D;
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  init(width: number, height: number) {
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, width, height);
  }

  draw(x: number[]) {}
}
