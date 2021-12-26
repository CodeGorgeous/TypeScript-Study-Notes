import Square from "../Square";
import { IPoint, IViews, IPoints } from "../interfaces"
import SquareExhibition from "../view/SquareExhibition";
import $ from "jquery";

/**
 * 方块组合类
 *  由: 方块形状、方块中心点、方块颜色组成
 */
export default class SquareGroup implements IViews {

    private _squares: readonly Square[];

    constructor(
        private _shape: IPoints,
        private _squareCore: IPoint,
        private _color: string
    ) {
        this._squares = this._shape.map((item: IPoint) => {
            const square = new Square({
                x: item.x + this._squareCore.x,
                y: item.y + this._squareCore.y
            }, this._color);
            return square;
        })
    }
    
    public get squareCore() : IPoint {
        return this._squareCore;
    }
    
    public set squareCore(v : IPoint) {
        // 更新坐标
        this._squareCore = v;
        // 更新组合坐标
        for (let i = 0; i < this._squares.length; i++) {
            this._squares[i].point = {
                x: this._shape[i].x + this._squareCore.x,
                y: this._shape[i].y + this._squareCore.y
            }
        }
    }

    show(container: JQuery<HTMLElement> = $(".root")): void {
        for (let i = 0; i < this._squares.length; i++) {
            if (this._squares[i].view) return;
            this._squares[i].view = new SquareExhibition(this._squares[i], container);
            this._squares[i].point = {
                x: this._shape[i].x + this._squareCore.x,
                y: this._shape[i].y + this._squareCore.y
            }
        }
    }

    hide(): void {
        for (const square of this._squares) {
            if (square.view) {
                square.view.hide();
                square.view = undefined;
            }
        }
    }
}