import { IPoints, IPoint, SquareDirection } from "../interfaces";
import Options from "../config";
import SquareGroup from "../SquareGroup";
import Square from "../Square";

export default abstract class GameRules {

    static ifMove(shape: IPoints, targetPoint: IPoint, squares: Square[] = []): boolean {
        const targetShapePoints: IPoints = shape.map(item => {
            return {
                x: item.x + targetPoint.x,
                y: item.y + targetPoint.y
            }
        })
        // 判别是否到达边界
        const result: boolean = targetShapePoints.some(item => {
            if (item.x < 0 || item.x >= Options.GameConfig.width || item.y < 0 || item.y >= Options.GameConfig.height) return true;
            return false;
        })
        if (result) return false;
        const resultTwo: boolean = targetShapePoints.some(item => {
            return squares.some(it => {
                if(item.x === it.point.x && item.y === it.point.y) return true;
                return false;
            })
        })
        if (resultTwo) return false;
        return true;
    }

    static move(squareGroup: SquareGroup, targetPoint: IPoint, squares?: Square[]): boolean;
    static move(squareGroup: SquareGroup, targetDirection: SquareDirection, squares?: Square[]): boolean;
    static move(squareGroup: SquareGroup, targetPointOrDirection: IPoint | SquareDirection, squares: Square[] = []): boolean {
        if (protectIPoint(targetPointOrDirection)) {
            if (this.ifMove(squareGroup.shape, targetPointOrDirection, squares)) {
                squareGroup.squareCore = targetPointOrDirection;
                return true;
            }
            return false;
        } else {
            if (targetPointOrDirection === SquareDirection.down) {
                const point: IPoint = {
                    x: squareGroup.squareCore.x,
                    y: squareGroup.squareCore.y + 1
                };
                if (this.ifMove(squareGroup.shape, point, squares)) {
                    squareGroup.squareCore = point;
                    return true;
                }
                return false;
            } else if (targetPointOrDirection === SquareDirection.left) {
                const point: IPoint= {
                    x: squareGroup.squareCore.x - 1,
                    y: squareGroup.squareCore.y
                }
                if (this.ifMove(squareGroup.shape, point, squares)) {
                    squareGroup.squareCore = point;
                    return true;
                }
                return false;
            } else if (targetPointOrDirection === SquareDirection.right) {
                const point: IPoint = {
                    x: squareGroup.squareCore.x + 1,
                    y: squareGroup.squareCore.y
                }
                if (this.ifMove(squareGroup.shape, point, squares)) {
                    squareGroup.squareCore = point;
                    return true;
                }
                return false;
            } else if (targetPointOrDirection === SquareDirection.up) {
                const point: IPoint = {
                    x: squareGroup.squareCore.x,
                    y: squareGroup.squareCore.y - 1
                }
                if (this.ifMove(squareGroup.shape, point, squares)) {
                    squareGroup.squareCore = point;
                    return true;
                }
                return false;
            }
        }
        return false;
    }
}

// 类型保护函数
function protectIPoint(target: any): target is IPoint {
    if (typeof target.x !== "undefined" && typeof target.y !== "undefined") {
        return true
    }
    return false;
}
