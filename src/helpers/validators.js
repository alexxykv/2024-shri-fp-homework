/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import {
  all,
  allPass,
  apply,
  compose,
  converge,
  count,
  countBy,
  curry,
  equals,
  filter,
  gte,
  identity,
  not,
  partialRight,
  prop,
  propEq,
  values
} from "ramda";
import { COLORS, SHAPES } from "../constants";

// Проверки на цвет
const isColorRed = equals(COLORS.RED);
const isColorBlue = equals(COLORS.BLUE);
const isColorOrange = equals(COLORS.ORANGE);
const isColorGreen = equals(COLORS.GREEN);
const isColorWhite = equals(COLORS.WHITE);

const isNotColorWhite = compose(not, isColorWhite);

// Получение цвета конкретной фигуры
const getSquare = prop(SHAPES.SQUARE);
const getTriangle = prop(SHAPES.TRIANGLE);

// Каррирования
const curriedPropEq = curry(propEq);
const starEquals = curriedPropEq(SHAPES.STAR);
const squareEquals = curriedPropEq(SHAPES.SQUARE);
const circleEquals = curriedPropEq(SHAPES.CIRCLE);
const triangleEquals = curriedPropEq(SHAPES.TRIANGLE);

// Проверка фигур на конкретный цвет
const starIsRed = starEquals(COLORS.RED);
const starIsWhite = starEquals(COLORS.WHITE);
const squareIsGreen = squareEquals(COLORS.GREEN);
const squareIsOrange = squareEquals(COLORS.ORANGE);
const squareIsWhite = squareEquals(COLORS.WHITE);
const circleIsWhite = circleEquals(COLORS.WHITE);
const circleIsBlue = circleEquals(COLORS.BLUE);
const triangleIsWhite = triangleEquals(COLORS.WHITE);
const triangleIsGreen = triangleEquals(COLORS.GREEN);

const starIsNotRed = compose(not, starIsRed);
const starIsNotWhite = compose(not, starIsWhite);
const triangleIsNotWhite = compose(not, triangleIsWhite);
const squareIsNotWhite = compose(not, squareIsWhite);

// Дополнительные функции
const greaterOrEqualsThan2 = partialRight(gte, [2]);
const greaterOrEqualsThan3 = partialRight(gte, [3]);
const countGreenShapes = compose(count(isColorGreen), values);
const countRedShapes = compose(count(isColorRed), values);
const countGreenShapesEquals2 = compose(equals(2), countGreenShapes);
const countRedShapesEquals1 = compose(equals(1), countRedShapes);
const getMaxEntry = compose(
  apply(Math.max),
  values,
  countBy(identity)
);

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
  starIsRed,
  squareIsGreen,
  circleIsWhite,
  triangleIsWhite
]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(
  greaterOrEqualsThan2,
  countGreenShapes
);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = compose(
  converge(equals, [
    count(isColorRed),
    count(isColorBlue)
  ]),
  values
);

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
  circleIsBlue,
  starIsRed,
  squareIsOrange
]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = compose(
  greaterOrEqualsThan3,
  getMaxEntry,
  filter(isNotColorWhite),
  values
);

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([
  triangleIsGreen,
  countGreenShapesEquals2,
  countRedShapesEquals1
]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = compose(
  all(isColorOrange),
  values
);

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = allPass([
  starIsNotRed,
  starIsNotWhite
]);

// 9. Все фигуры зеленые.
export const validateFieldN9 = compose(
  all(isColorGreen),
  values
);

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = allPass([
  triangleIsNotWhite,
  squareIsNotWhite,
  converge(equals, [
    getTriangle,
    getSquare
  ])
]);
