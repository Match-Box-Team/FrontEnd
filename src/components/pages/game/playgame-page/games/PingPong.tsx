import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSocket } from '../game-socket/GameSocketContext';

export default function PingPong() {
  const socket = useSocket();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (socket) {
      socket.emit('ready', {
        width: canvasRef.current!.width,
        height: canvasRef.current!.height,
      });
      console.log('pingpong~!!');
    }
  }, []);

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
    if (socket) {
      socket.on('ballcontrol', (data: any) => {
        // Update ball.x and ball.y with the value received from the server
        ball.x = data.ball.x;
        ball.y = data.ball.y;
        ball.color = data.ball.color;
        ball.radius = data.ball.radius;
        // console.log(ball.x, ball.y);
      });
    }
    // console.log(ball.x, ball.y);
    // console.log(ball.x);
    // ball.x += ball.velocityX;
    // ball.y += ball.velocityY;

    // if (
    //   ball.x + ball.radius > canvasRef.current!.width ||
    //   ball.x - ball.radius < 0
    // ) {
    //   ball.velocityX = -ball.velocityX;
    // }

    // if (
    //   ball.y + ball.radius > canvasRef.current!.height ||
    //   ball.y - ball.radius < 0
    // ) {
    //   ball.velocityY = -ball.velocityY;
    // }

    if (socket) {
      socket.on('gamecontrolB', (data: any) => {
        // Update paddleB.x with the value received from the server
        paddleB.x = data.position;
      });
    }
    if (socket) {
      socket.on('gamecontrolA', (data: any) => {
        // Update paddleA.x with the value received from the server
        paddleA.x = data.position;
      });
    }

    // if (paddleA.x < 0) {
    //   paddleA.x = 0;
    // } else if (paddleA.x + paddleA.width > canvasRef.current!.width) {
    //   paddleA.x = canvasRef.current!.width - paddleA.width;
    // }

    // if (paddleB.x < 0) {
    //   paddleB.x = 0;
    // } else if (paddleB.x + paddleB.width > canvasRef.current!.width) {
    //   paddleB.x = canvasRef.current!.width - paddleB.width;
    // }

    // if (
    //   (ball.y - ball.radius < paddleA.y + paddleA.height &&
    //     ball.y + ball.radius > paddleA.y &&
    //     ball.x - ball.radius < paddleA.x + paddleA.width &&
    //     ball.x + ball.radius > paddleA.x) ||
    //   (ball.y - ball.radius < paddleB.y + paddleB.height &&
    //     ball.y + ball.radius > paddleB.y &&
    //     ball.x - ball.radius < paddleB.x + paddleB.width &&
    //     ball.x + ball.radius > paddleB.x)
    // ) {
    //   ball.velocityY = -ball.velocityY;
    // }
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

  const paddleADirection = 0;
  const paddleBDirection = 0;
  // 각 키에 대한 상태를 추적하는 객체를 생성합니다.
  const keyState: any = {
    ArrowLeft: false,
    ArrowRight: false,
    a: false,
    A: false,
    d: false,
    D: false,
  };
  const intervalIds: any = {
    ArrowLeft: null,
    ArrowRight: null,
    a: null,
    A: null,
    d: null,
    D: null,
  };

  function keyDownHandler(e: KeyboardEvent) {
    const key = e.key.toLowerCase(); // Convert the key value to lowercase
    if (socket && !keyState[key]) {
      keyState[key] = true; // 키가 눌린 상태로 설정합니다.
      if (key === 'arrowleft' || key === 'arrowright') {
        clearInterval(intervalIds[key]);
        intervalIds[key] = setInterval(() => {
          socket.emit('gamecontrolB', {
            direction: key === 'arrowleft' ? -1 : 1,
          });
        }, 5);
      } else if (key === 'a' || key === 'd') {
        clearInterval(intervalIds[key]);
        intervalIds[key] = setInterval(() => {
          socket.emit('gamecontrolA', {
            direction: key === 'a' ? -1 : 1,
          });
        }, 5);
      }
    }
  }

  function keyUpHandler(e: KeyboardEvent) {
    const key = e.key.toLowerCase(); // Convert the key value to lowercase
    if (socket && keyState[key]) {
      keyState[key] = false; // 키가 떼진 상태로 설정합니다.
      clearInterval(intervalIds[key]);
      if (key === 'arrowleft' || key === 'arrowright') {
        socket.emit('gamecontrolB', { direction: 0 });
      } else if (key === 'a' || key === 'd') {
        socket.emit('gamecontrolA', { direction: 0 });
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
