import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

export default function PingPong() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 게임 요소 정의
  const ball = {
    x: 0,
    y: 0,
    radius: 10,
    velocityX: 2,
    velocityY: 2,
    speed: 3,
    color: 'yellow',
  };

  const paddle = {
    x: 0,
    y: 0,
    width: 80,
    height: 10,
    speed: 3,
    color: 'skyblue',
  };

  let score = 0;

  // 공 그리기
  function drawBall(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
  }

  // 패들 그리기
  function drawPaddle(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = paddle.color;
    ctx.fill();
    ctx.closePath();
  }

  // 점수 그리기
  function drawScore(ctx: CanvasRenderingContext2D) {
    ctx.font = '16px Arial';
    ctx.fillStyle = 'WHITE';
    ctx.fillText(`Score: ${score}`, 8, 20);
  }

  // 게임 상태 업데이트
  function update() {
    // 공 이동
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // 벽 충돌 감지
    if (
      ball.x + ball.radius > canvasRef.current!.width ||
      ball.x - ball.radius < 0
    ) {
      ball.velocityX = -ball.velocityX;
    }

    if (ball.y - ball.radius < 0) {
      ball.velocityY = -ball.velocityY;
    }

    if (ball.y + ball.radius > canvasRef.current!.height) {
      // 패들 충돌 감지
      if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
        ball.velocityY = -ball.velocityY;
        score += 1;
      } else {
        // 게임 오버
        // alert('GAME OVER!');
        document.location.reload();
      }
    }

    // 패들 이동
    if (rightPressed && paddle.x < canvasRef.current!.width - paddle.width) {
      paddle.x += paddle.speed;
    } else if (leftPressed && paddle.x > 0) {
      paddle.x -= paddle.speed;
    }
  }

  // 게임 그리기
  function draw() {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');

      // 캔버스 지우기
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        drawBall(ctx);
        drawPaddle(ctx);
        drawScore(ctx);
      }

      // 게임 상태 업데이트
      update();
    }
  }

  // 키 이벤트 핸들링
  let rightPressed = false;
  let leftPressed = false;
  function keyDownHandler(e: KeyboardEvent) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      leftPressed = true;
    }
  }

  function keyUpHandler(e: KeyboardEvent) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      leftPressed = false;
    }
  }

  // 캔버스 크기 설정
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // 캔버스 크기 설정
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;

        // 공 위치 초기화
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;

        // 패들 위치 초기화
        paddle.x = (canvas.width - paddle.width) / 2;
        paddle.y = canvas.height - paddle.height;

        // 키 이벤트 리스너 추가
        document.addEventListener('keydown', keyDownHandler);
        document.addEventListener('keyup', keyUpHandler);
      }
      // 게임 루프 시작
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
    /* margin: 0 auto; */
    width: 100%;
    height: 75vh;
  }
`;
