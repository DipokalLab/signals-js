export class RealtimeChart {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  public init(width: number, height: number) {
    this.ctx.clearRect(0, 0, width, height);
    this.width = width;
    this.height = height;
  }

  public draw(x: number[]) {
    const length = x.length;
    const dx = this.width / length;
    const centerY = this.height / 2;
    const maxHeight = this.getMaxValue(x);
    const heightPadding = 1.4;

    this.ctx.strokeStyle = "#ffffff";
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);

    for (let index = 0; index < length; index++) {
      this.ctx.lineTo(
        dx * index,
        (x[index] * (this.height / maxHeight)) / heightPadding + centerY
      );
    }

    this.ctx.stroke();
  }

  private getMaxValue(x: number[]) {
    let maxValue = 0;

    for (let index = 0; index < x.length; index++) {
      const element = x[index];
      if (maxValue < element) {
        maxValue = element;
      }
    }

    return maxValue;
  }
}
