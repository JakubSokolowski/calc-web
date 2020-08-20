import { GridLine, LineType } from '../..';
import {
    anyHorizontalLineIntersects,
    anyVerticalLineIntersects,
    horizontalLineIntersects,
    verticalLineIntersects
} from './grid-line-utils';

describe('grid-line-utils', () => {
    describe('#verticalLineIntersects', () => {
        const line: GridLine = {
            type: LineType.Vertical,
            span: {
                from: 0,
                to: 2
            },
            index: 2
        };

        it('should return true if vertical line intersects with cell border', () => {
            // given
            const x = 2;
            const y = 1;

            // when
            const result = verticalLineIntersects(x, y, line);

            // then
            expect(result).toBeTruthy();
        });

        it('should return false if vertical line does not intersect with cell border', () => {
            // given
            const x = 5;
            const y = 0;

            // when
            const result = verticalLineIntersects(x, y, line);

            // then
            expect(result).toBeFalsy();
        });
    });

    describe('#horizontalLineIntersects', () => {
        const lineSegment: GridLine = {
            type: LineType.Horizontal,
            span: {
                from: 1,
                to: 4
            },
            index: 1
        };

        it('should return true if horizontal line segment intersects with cell border', () => {
            // given
            const x = 4;
            const y = 1;

            // when
            const result = horizontalLineIntersects(x, y, lineSegment);

            // then
            expect(result).toBeTruthy();
        });

        it('should return false if horizontal line segment does not intersect with cell border', () => {
            // given
            const x = 5;
            const y = 3;

            // when
            const result = horizontalLineIntersects(x, y, lineSegment);

            // then
            expect(result).toBeFalsy();
        });

        it('should return true horizontal ray intersects with cell border ', () => {
            // given
            const x = 4;
            const y = 1;

            const ray: GridLine = {
                type: LineType.Horizontal,
                span: {
                    from: 1
                },
                index: 1
            };

            // when
            const result = horizontalLineIntersects(x, y, ray);

            // then
            expect(result).toBeTruthy();
        });

        it('should return true horizontal line intersects with cell border ', () => {
            // given
            const x = 4;
            const y = 1;

            const line: GridLine = {
                type: LineType.Horizontal,
                index: 1
            };

            // when
            const result = horizontalLineIntersects(x, y, line);

            // then
            expect(result).toBeTruthy();
        });
    });

    describe('#anyVerticalLineIntersects', () => {
        const lines: GridLine[] = [
            {
                type: LineType.Vertical,
                span: {
                    from: 0,
                    to: 2
                },
                index: 2
            },
            {
                type: LineType.Vertical,
                span: {
                    from: 0,
                    to: 2
                },
                index: 3
            },
            {
                type: LineType.Horizontal,
                span: {
                    from: 1,
                    to: 4
                },
                index: 1
            }
        ];

        it('should return true if any vertical line intersects cell', () => {
            // given
            const x = 2;
            const y = 1;

            // when
            const result = anyVerticalLineIntersects(x, y, lines);

            // then
            expect(result).toBeTruthy();
        });

        it('should return false if no vertical lines intersect cell', () => {
            // given
            const x = 0;
            const y = 0;

            // when
            const result = anyVerticalLineIntersects(x, y, lines);

            // then
            expect(result).toBeFalsy();
        });
    });

    describe('#anyHorizontalLineIntersects', () => {
        const lines: GridLine[] = [
            {
                type: LineType.Vertical,
                span: {
                    from: 0,
                    to: 2
                },
                index: 2
            },
            {
                type: LineType.Horizontal,
                span: {
                    from: 1,
                    to: 4
                },
                index: 1
            },
            {
                type: LineType.Horizontal,
                span: {
                    from: 1,
                    to: 4
                },
                index: 1
            }
        ];

        it('should return true if any horizontal line intersects cell', () => {
            // given
            const x = 3;
            const y = 1;

            // when
            const result = anyHorizontalLineIntersects(x, y, lines);

            // then
            expect(result).toBeTruthy();
        });

        it('should return false if no horizontal lines intersect cell', () => {
            // given
            const x = 5;
            const y = 5;

            // when
            const result = anyHorizontalLineIntersects(x, y, lines);

            // then
            expect(result).toBeFalsy();
        });
    });
});
