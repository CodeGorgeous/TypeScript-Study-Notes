export enum Color{
    heart = '♥️',
    spade = '♠️',
    block = '♦️',
    blossom = '♣️'
}
export enum Point{
    one = 'A',
    two = '2',
    three = '3',
    four = '4',
    five = '5',
    six = '6',
    seven = '7',
    eight = '8',
    nine = '9',
    ten = '10',
    eleven = 'J',
    twelve = 'Q',
    thirteen = 'K'
}
export interface specialPoint{
    type: 'JOKER' | 'joker'
}