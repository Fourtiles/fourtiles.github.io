<script setup lang="ts">
// this code comes from https://codepen.io/baumannzone/pen/MWbNMGv
</script>

<template>
  <div class="unicorn-container">
    <div class="unicorn">
      <div class="header">
        <div class="horn">
          <div class="lines-container"></div>
        </div>
        <div class="head">
          <div class="face">
            <div class="pink"></div>
            <div class="white"></div>
          </div>
          <div class="hair">
            <div class="inner-hair"></div>
          </div>
        </div>
        <div class="neck"></div>
      </div>
      <div class="body">
        <div class="main"></div>
        <div class="tail">
          <div class="inner-tail"></div>
        </div>
      </div>
      <div class="legs">
        <div class="leg"></div>
        <div class="leg"></div>
        <div class="leg"></div>
        <div class="leg"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
*,
*::before,
*::after {
  box-sizing: inherit;
}

.unicorn-container {
  display: flex;
  justify-content: center;
}

.unicorn {
  margin-top: 50px;
  margin-left: -130px;

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .horn {
    position: relative;
    overflow: hidden;
    width: 40px;
    height: 50px;

    .lines-container {
      width: 20px;
      height: 50px;
      position: absolute;
      overflow: hidden;
      transform: skew(-20deg, 68deg);
      top: 25px;
      left: 10px;
      background: var(--horn);
      background: linear-gradient(
        105deg,
        var(--horn) 0%,
        var(--horn) 8%,
        var(--horn-line) 9%,
        var(--horn-line) 13%,
        var(--horn) 14%,
        var(--horn) 38%,
        var(--horn-line) 39%,
        var(--horn-line) 43%,
        var(--horn) 44%
      );
    }
  }

  .head {
    display: flex;
    justify-content: center;
    margin-left: 70px;
  }

  .face {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    position: relative;
    z-index: 1;

    .pink {
      z-index: 2;
      position: relative;
      width: 80px;
      height: 85px;
      background-color: var(--pink-light);
      border-radius: 20px 8px 8px 20px;

      &::before {
        content: '';
        position: absolute;
        width: 8px;
        height: 8px;
        background-color: var(--pink-dark);
        border-radius: 50%;
        top: 20px;
        left: 10px;
        box-shadow: 25px 0 var(--pink-dark);
      }

      &::after {
        content: '';
        position: absolute;
        width: 55px;
        height: 40px;
        background-color: var(--pink-dark);
        border-radius: 4px 4px 30px 30px;
        bottom: 5px;
        left: 11px;
      }
    }

    .white {
      position: relative;
      width: 90px;
      height: 85px;
      background-color: var(--white-face);
      margin-left: -30px;
      border-bottom-right-radius: 35px;
      box-shadow: 0 11px var(--white-face-shadow);

      &::before {
        content: '';
        position: absolute;
        width: 8px;
        height: 8px;
        background-color: white;
        border-radius: 50%;
        top: 20px;
        right: 30px;
        box-shadow: 3px 4px 0 7px var(--purple-eye);
      }

      &::after {
        content: '';
        position: absolute;
        width: 14px;
        height: 35px;
        background-color: var(--pink-dark);
        border-radius: 7px 7px 0 0;
        top: -35px;
        right: 4px;
        box-shadow: 0 0 0 4px var(--white-face);
      }
    }
  }

  .hair {
    position: relative;
    overflow: hidden;
    width: 230px;
    height: 180px;
    margin-left: -100px;
    border-top-left-radius: 30px;

    .inner-hair {
      position: relative;
      width: 230px;
      height: 18px;
      border-radius: 0 9px 9px 0;
      background: var(--r-red);
      box-shadow:
        -15px 18px var(--r-orange),
        -15px 36px var(--r-yellow),
        -12px 54px var(--r-green),
        -15px 72px var(--r-blue),
        -8px 90px var(--r-purple),
        -15px 108px var(--r-pink),
        -6px 126px var(--r-red),
        -15px 144px var(--r-orange),
        -8px 162px var(--r-yellow),
        -8px 180px var(--r-green);
      animation: hair 2s linear infinite;

      &::after {
        position: relative;
        overflow: hidden;
        width: 50px;
        height: 18px;
        border-radius: 9px;
        right: 0px;
        box-shadow:
          -12px 18px var(--blue-bg),
          13px 54px var(--blue-bg),
          -6px 90px var(--blue-bg),
          14px 126px var(--blue-bg),
          -7px 162px var(--blue-bg);
      }
    }
  }

  .neck {
    position: relative;
    width: 90px;
    height: 50px;
    background-color: var(--white-face);
    margin-left: -10px;
    margin-top: -95px;
  }

  .body {
    display: flex;
  }

  .main {
    position: relative;
    width: 300px;
    height: 150px;
    left: 200px;
    background: var(--white-face);
    background: radial-gradient(circle at 250px 65%, #fff 0%, #fff 70px, var(--white-face) 71px);
    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 75px;
    border-top-right-radius: 75px;

    &::after {
      content: '';
      position: absolute;
      width: 40px;
      height: 40px;
      left: 70px;
      top: -20px;
      border-bottom-left-radius: 60px;
      border-bottom: 20px solid var(--white-face);
      border-left: 20px solid var(--white-face);
    }

    &::before {
      content: '';
      position: absolute;
      width: 20px;
      height: 70px;
      left: -20px;
      top: -20px;
      background-color: var(--blue-bg);
    }
  }

  .tail {
    position: relative;
    width: 200px;
    height: 18px;
    z-index: -1;
    border-radius: 0 9px 9px 0;
    left: 100px;
    top: 20px;
    background: var(--r-red);
    box-shadow:
      0 18px var(--r-orange),
      60px 36px var(--r-yellow),
      0 54px var(--r-green),
      -20px 72px var(--r-blue);
    animation: tail 1.5s linear infinite;

    &::after {
      position: relative;
      overflow: hidden;
      width: 70px;
      height: 18px;
      border-radius: 9px;
      right: 0px;
      box-shadow:
        10px 18px var(--blue-bg),
        10px 54px var(--blue-bg);
    }

    &::before {
      content: '';
      position: absolute;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      bottom: -140px;
      left: 10px;
      background: var(--blue-bg)
        linear-gradient(220deg, var(--blue-bg) 0%, var(--blue-bg) 55%, transparent 56%);
    }

    .inner-tail {
      position: absolute;
      width: 28px;
      height: 28px;
      background-color: transparent;
      border-bottom: 10px solid var(--blue-bg);
      border-left: 10px solid var(--blue-bg);
      right: 58px;
      top: 72px;
      border-bottom-left-radius: 30px;
    }
  }

  .legs {
    position: relative;
    top: -50px;

    .leg {
      position: absolute;
      width: 80px;
      height: 80px;
      border-bottom: 35px solid;
      border-left: 35px solid;
      border-bottom-left-radius: 80px;

      &::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 35px;
        background-color: var(--red-hoof);
        bottom: -35px;
        right: -20px;
        border-bottom-right-radius: 17.5px;
        border-top-right-radius: 17.5px;
      }
    }

    :nth-child(odd) {
      color: var(--grey-leg);
    }

    :nth-child(even) {
      color: #fff;
    }

    :nth-child(1) {
      transform: rotate(90deg);
      top: -30px;
      left: 200px;
      z-index: -1;
      transform-origin: top left;
      animation: leg1 1s ease-in-out infinite alternate;
    }

    :nth-child(2) {
      transform: rotate(40deg);
      top: -10px;
      left: 250px;
      transform-origin: top left;
      animation: leg2 1s 0.15s ease-in-out infinite alternate;

      &::before {
        content: '';
        position: absolute;
        width: 35px;
        height: 20px;
        background-color: #fff;
        top: -20px;
        left: -35px;
        border-top-right-radius: 17.5px;
        border-top-left-radius: 17.5px;
      }
    }

    :nth-child(3) {
      transform: rotate(30deg);
      top: -15px;
      left: 352px;
      z-index: -1;
      transform-origin: top left;
      animation: leg3 1s ease-in-out infinite alternate;
    }

    :nth-child(4) {
      transform: rotate(60deg);
      top: -5px;
      left: 400px;
      transform-origin: top left;
      animation: leg4 1s ease-in-out infinite alternate;
    }
  }
}

@keyframes leg1 {
  to {
    transform: rotate(50deg);
  }
}

@keyframes leg2 {
  to {
    transform: rotate(80deg);
  }
}

@keyframes leg3 {
  to {
    transform: rotate(70deg);
  }
}

@keyframes leg4 {
  to {
    transform: rotate(20deg);
  }
}

@keyframes hair {
  14% {
    box-shadow:
      -15px 18px var(--r-yellow),
      -15px 36px var(--r-green),
      -12px 54px var(--r-blue),
      -15px 72px var(--r-purple),
      -8px 90px var(--r-pink),
      -15px 108px var(--r-red),
      -6px 126px var(--r-orange),
      -15px 144px var(--r-yellow),
      -8px 162px var(--r-green),
      -8px 180px var(--r-blue);
  }

  28% {
    box-shadow:
      -15px 18px var(--r-green),
      -15px 36px var(--r-blue),
      -12px 54px var(--r-purple),
      -15px 72px var(--r-pink),
      -8px 90px var(--r-red),
      -15px 108px var(--r-orange),
      -6px 126px var(--r-yellow),
      -15px 144px var(--r-green),
      -8px 162px var(--r-blue),
      -8px 180px var(--r-purple);
  }

  42% {
    box-shadow:
      -15px 18px var(--r-blue),
      -15px 36px var(--r-purple),
      -12px 54px var(--r-pink),
      -15px 72px var(--r-red),
      -8px 90px var(--r-orange),
      -15px 108px var(--r-yellow),
      -6px 126px var(--r-green),
      -15px 144px var(--r-blue),
      -8px 162px var(--r-purple),
      -8px 180px var(--r-pink);
  }

  56% {
    box-shadow:
      -15px 18px var(--r-purple),
      -15px 36px var(--r-pink),
      -12px 54px var(--r-red),
      -15px 72px var(--r-orange),
      -8px 90px var(--r-yellow),
      -15px 108px var(--r-green),
      -6px 126px var(--r-blue),
      -15px 144px var(--r-purple),
      -8px 162px var(--r-pink),
      -8px 180px var(--r-red);
  }

  70% {
    box-shadow:
      -15px 18px var(--r-pink),
      -15px 36px var(--r-red),
      -12px 54px var(--r-orange),
      -15px 72px var(--r-yellow),
      -8px 90px var(--r-green),
      -15px 108px var(--r-blue),
      -6px 126px var(--r-purple),
      -15px 144px var(--r-pink),
      -8px 162px var(--r-red),
      -8px 180px var(--r-orange);
  }

  85% {
    box-shadow:
      -15px 18px var(--r-red),
      -15px 36px var(--r-orange),
      -12px 54px var(--r-yellow),
      -15px 72px var(--r-green),
      -8px 90px var(--r-blue),
      -15px 108px var(--r-purple),
      -6px 126px var(--r-pink),
      -15px 144px var(--r-red),
      -8 px 162 px var(--r-orange),
      -8 px 180 px var(--r-yellow);
  }

  100% {
    box-shadow:
      -15px 18px var(--r-orange),
      -15px 36px var(--r-yellow),
      -12px 54px var(--r-green),
      -15px 72px var(--r-blue),
      -8px 90px var(--r-purple),
      -15px 108px var(--r-pink),
      -6px 126px var(--r-red),
      -15px 144px var(--r-orange),
      -8px 162px var(--r-yellow),
      -8px 180px var(--r-green);
  }
}

@keyframes tail {
  20% {
    background: var(--r-orange);
    box-shadow:
      0 18px var(--r-yellow),
      60px 36px var(--r-green),
      0 54px var(--r-blue),
      -20px 72px var(--r-red);
  }

  40% {
    background: var(--r-yellow);
    box-shadow:
      0 18px var(--r-green),
      60px 36px var(--r-blue),
      0 54px var(--r-red),
      -20px 72px var(--r-orange);
  }

  60% {
    background: var(--r-green);
    box-shadow:
      0 18px var(--r-blue),
      60px 36px var(--r-red),
      0 54px var(--r-orange),
      -20px 72px var(--r-yellow);
  }

  80% {
    background: var(--r-blue);
    box-shadow:
      0 18px var(--r-red),
      60px 36px var(--r-orange),
      0 54px var(--r-yellow),
      -20px 72px var(--r-green);
  }
}

@keyframes rotate {
  100% {
    transform: rotate(1turn);
  }
}
</style>
