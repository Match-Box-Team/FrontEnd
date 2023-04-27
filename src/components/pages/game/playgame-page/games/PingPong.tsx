import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

export default function PingPong() {
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

    paddleA.x += paddleA.speed * paddleADirection;
    paddleB.x += paddleB.speed * paddleBDirection;

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
    if (e.key === 'ArrowLeft') {
      paddleBDirection = -1;
    } else if (e.key === 'ArrowRight') {
      paddleBDirection = 1;
    } else if (e.key === 'a' || e.key === 'A') {
      paddleADirection = -1;
    } else if (e.key === 'd' || e.key === 'D') {
      paddleADirection = 1;
    }
  }

  function keyUpHandler(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      paddleBDirection = 0;
    } else if (
      e.key === 'a' ||
      e.key === 'A' ||
      e.key === 'd' ||
      e.key === 'D'
    ) {
      paddleADirection = 0;
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
      paddleA.y = 30; // 수정된 부분
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
