export class Vector2D {
  x: number = 0;
  y: number = 0;
  constructor($x: number = 0, $y: number = 0) {
    this.x = $x;
    this.y = $y;
  }

  public normalize(): void {
    var le: number = this.length;
    if (le == 0) {
      return;
    }
    this.scaleBy(1 / le);
  }

  public get length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * 设置角度  (X轴夹角,弧度)
   * @param value
   * 
   */
  public set vAngle(value: number) {
    var len = length;
    this.x = Math.cos(value) * len;
    this.y = Math.sin(value) * len;
  }

  /**
   * 获取角度,弧度
   * @return 
   * 
   */
  public get vAngle(): number {
    return Math.atan2(this.y, this.x);
  }

  /**
   * 设置向量的大小  
   * @param value
   * 
   */
  public set length(value: number) {
    var a = this.vAngle;
    this.x = Math.cos(a) * value;
    this.y = Math.sin(a) * value;
  }

  public scaleBy(value: number): void {
    this.x *= value;
    this.y *= value;
  }

  public sub(val: Vector2D): Vector2D {
    return new Vector2D(val.x - this.x, val.y - this.y);
  }

  public add(val: Vector2D): Vector2D {
    return new Vector2D(val.x + this.x, val.y + this.y);
  }

  public toString(): String {
    return "Vector2D(" + String(this.x) + "," + String(this.y) + ")";
  }

  public static distance(p1: Vector2D, p2: Vector2D): number {
    var xx: number = p1.x - p2.x;
    var yy: number = p1.y - p2.y;
    return Math.sqrt(xx * xx + yy * yy);
  }
  public subtract(value: Vector2D): Vector2D {
    return new Vector2D(this.x - value.x, this.y - value.y);
  }
}