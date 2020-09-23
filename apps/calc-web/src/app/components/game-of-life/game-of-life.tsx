import React, { FC, useCallback, useEffect, useRef } from 'react';
import { Card, Typography, useTheme } from '@material-ui/core';
import { Cell, Universe } from '@calc/calc-rs';
import { memory } from '../../../../../../libs/calc-rs/pkg/index_bg.wasm';

const CELL_SIZE = 2; // px

const GameOfLife: FC = () => {
    const theme = useTheme();
    const universe = Universe.new(100, 40);
    const width = universe.width();
    const height = universe.height();
    const canvasRef = useRef(null);

    const drawGrid = useCallback((ctx: CanvasRenderingContext2D) => {
        ctx.beginPath();
        ctx.strokeStyle = theme.palette.background.default;

        // Vertical lines.
        for (let i = 0; i <= width; i++) {
            ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
            ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
        }

        // Horizontal lines.
        for (let j = 0; j <= height; j++) {
            ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
            ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
        }

        ctx.stroke();
    }, [height, theme.palette.background.default, width]);

    const getIndex = useCallback((row: number, column: number): number => {
        return row * width + column;
    }, [width]);

    const drawCells = useCallback((ctx: CanvasRenderingContext2D) => {
        const cellsPtr = universe.cells();
        const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

        ctx.beginPath();

        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                const idx = getIndex(row, col);

                ctx.fillStyle = cells[idx] === Cell.Dead
                    ? theme.palette.primary.dark
                    : theme.palette.secondary.dark;

                ctx.fillRect(
                    col * (CELL_SIZE + 1) + 1,
                    row * (CELL_SIZE + 1) + 1,
                    CELL_SIZE,
                    CELL_SIZE
                );
            }
        }

        ctx.stroke();
    }, [getIndex, height, theme.palette.primary.dark, theme.palette.secondary.dark, universe, width]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        let frameCount = 0;
        let animationFrameId;

        const draw = (ctx, frameCount) => {
            universe.tick();
            drawGrid(ctx);
            drawCells(ctx);
        };

        const render = () => {
            frameCount++;
            draw(context, frameCount);
            setTimeout(() => {
                animationFrameId = window.requestAnimationFrame(render);
            }, 100);
        };
        render();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    });


    return (
        <Card style={{ padding: theme.spacing(2) }}>
            <Typography variant={'h4'}>Game of life</Typography>
            <div style={{ height: theme.spacing(1) }}/>
            <canvas style={{ width: '100%', height: '100%' }} ref={canvasRef}/>
        </Card>
    );
};

export default GameOfLife;
