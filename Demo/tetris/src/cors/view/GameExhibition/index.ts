import { IGameViews } from "../../interfaces";
import SquareGroup from "../../SquareGroup";
import $ from "jquery";

export default class GameExhibition implements IGameViews {
    showNext(tetris: SquareGroup): void {
        tetris.show($(".wait"));
    }
    switch(tetris: SquareGroup): void {
        tetris.hide($(".main"));
    }
    
}