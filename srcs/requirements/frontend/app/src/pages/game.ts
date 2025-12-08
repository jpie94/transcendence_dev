// pages/game.ts

export function renderGame(): string {
  return `
    <div class="flex-grow flex items-center justify-center text-center px-2">
      <div class="flex flex-col">  
        <h2 class="text-2xl font-bold mb-4">Game (Pong)</h2>
        <canvas id="pong" class="border w-full h-96 bg-black nb-rounded"></canvas>
      </div>
    </div>
  `;
}
