import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSocket } from '../game-socket/GameSocketContext';

interface GameState {
  ball: { x: number; y: number };
  paddleA: { x: number; y: number };
  paddleB: { x: number; y: number };
}

export default function PingPong() {
  const socket = useSocket();
  const [gameState, setGameState] = useState<GameState>({
    ball: { x: 0, y: 0 },
    paddleA: { x: 0, y: 0 },
    paddleB: { x: 0, y: 0 },
  });

  useEffect(() => {
    if (socket) {
      socket.emit('ready', { gameControl: 'controls..' });
      console.log('pingpong~!!');
    }
  }, [socket]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const ball = {
    x: 0,
    y: 0,
    radius: 10,
    velocityX: 5,
    velocityY: 5,
    color: 'white',
  };

  const paddleA = {
    x: 0,
    y: 30,
    width: 100,
    height: 10,
    speed: 4,
    color: 'yellow',
  };

  const paddleB = {
    x: 0,
    y: 0,
    width: 100,
    height: 10,
    speed: 4,
    color: 'skyblue',
  };

  function drawBall(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
  }

  function drawPaddle(ctx: CanvasRenderingContext2D, paddle: any) {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = paddle.color;
    ctx.fill();
    ctx.closePath();
  }

  function update() {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    if (
      ball.x + ball.radius > canvasRef.current!.width ||
      ball.x - ball.radius < 0
    ) {
      ball.velocityX = -ball.velocityX;
    }

    if (
      ball.y + ball.radius > canvasRef.current!.height ||
      ball.y - ball.radius < 0
    ) {
      ball.velocityY = -ball.velocityY;
    }

    if (socket) {
      socket.on('gamecontrol', (data: any) => {
        paddleBDirection = data.direction;
      });
      paddleB.x += paddleB.speed * paddleBDirection;
    }
    paddleA.x += paddleA.speed * paddleADirection;

    if (paddleA.x < 0) {
      paddleA.x = 0;
    } else if (paddleA.x + paddleA.width > canvasRef.current!.width) {
      paddleA.x = canvasRef.current!.width - paddleA.width;
    }

    if (paddleB.x < 0) {
      paddleB.x = 0;
    } else if (paddleB.x + paddleB.width > canvasRef.current!.width) {
      paddleB.x = canvasRef.current!.width - paddleB.width;
    }

    if (
      (ball.y - ball.radius < paddleA.y + paddleA.height &&
        ball.y + ball.radius > paddleA.y &&
        ball.x - ball.radius < paddleA.x + paddleA.width &&
        ball.x + ball.radius > paddleA.x) ||
      (ball.y - ball.radius < paddleB.y + paddleB.height &&
        ball.y + ball.radius > paddleB.y &&
        ball.x - ball.radius < paddleB.x + paddleB.width &&
        ball.x + ball.radius > paddleB.x)
    ) {
      ball.velocityY = -ball.velocityY;
    }

    gameState.ball.x = ball.x;
    gameState.ball.y = ball.y;
    gameState.paddleA.x = paddleA.x;
    gameState.paddleA.y = paddleA.y;
    gameState.paddleB.x = paddleB.x;
    gameState.paddleB.y = paddleB.y;

    if (socket) {
      socket.emit('gamestate', {
        ball: { x: ball.x, y: ball.y },
        paddleA: { x: paddleA.x, y: paddleA.y },
        paddleB: { x: paddleB.x, y: paddleB.y },
      });
    }
  }

  function draw() {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');

      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        drawBall(ctx);
        drawPaddle(ctx, paddleA);
        drawPaddle(ctx, paddleB);
      }

      update();
    }
  }

  let paddleADirection = 0;
  let paddleBDirection = 0;
  function keyDownHandler(e: KeyboardEvent) {
    if (socket) {
      if (e.key === 'ArrowLeft') {
        socket.emit('gamecontrol', { direction: -1 });
        // paddleBDirection = -1;
      } else if (e.key === 'ArrowRight') {
        socket.emit('gamecontrol', { direction: 1 });
        // paddleBDirection = 1;
      } else if (e.key === 'a' || e.key === 'A') {
        paddleADirection = -1;
      } else if (e.key === 'd' || e.key === 'D') {
        paddleADirection = 1;
      }
    }
  }

  function keyUpHandler(e: KeyboardEvent) {
    if (socket) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        socket.emit('gamecontrol', { direction: 0 });
        // paddleBDirection = 0;
      } else if (
        e.key === 'a' ||
        e.key === 'A' ||
        e.key === 'd' ||
        e.key === 'D'
      ) {
        paddleADirection = 0;
      }
    }
  }

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.parentElement!.clientWidth;
      canvas.height = canvas.parentElement!.clientHeight;

      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;

      paddleA.x = canvas.width / 2 - paddleA.width / 2;
      paddleA.y = 30;
      paddleB.x = canvas.width / 2 - paddleB.width / 2;
      paddleB.y = canvas.height - paddleB.height - 30;

      document.addEventListener('keydown', keyDownHandler);
      document.addEventListener('keyup', keyUpHandler);

      const gameLoop = () => {
        draw();
        requestAnimationFrame(gameLoop);
      };

      requestAnimationFrame(gameLoop);
    }

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
    };
  }, []);

  return (
    <Game>
      <canvas ref={canvasRef} />
    </Game>
  );
}

const Game = styled.div`
  canvas {
    background: #000;
    display: block;
    width: 100%;
    height: 75vh;
  }
`;
