import type { CanvasBox } from "./types";

const W = 1920;
const H = 1080;

export function captureCanvasAsDataUrl(boxes: CanvasBox[]): string {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = "#e5e7eb";
  ctx.setLineDash([8, 8]);
  ctx.lineWidth = 1;
  for (const f of [0.25, 0.5, 0.75]) {
    ctx.beginPath();
    ctx.moveTo(W * f, 0);
    ctx.lineTo(W * f, H);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, H * f);
    ctx.lineTo(W, H * f);
    ctx.stroke();
  }
  ctx.setLineDash([]);

  for (const box of boxes) {
    ctx.fillStyle = box.color + "33";
    ctx.fillRect(box.x, box.y, box.width, box.height);

    ctx.strokeStyle = box.color;
    ctx.lineWidth = 2;
    ctx.strokeRect(box.x, box.y, box.width, box.height);

    ctx.fillStyle = box.color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.font = "bold 24px sans-serif";
    ctx.fillText(
      box.label,
      box.x + box.width / 2,
      box.y + box.height / 2 - 12,
      box.width - 16
    );

    ctx.font = "18px sans-serif";
    ctx.globalAlpha = 0.6;
    ctx.fillText(
      box.type,
      box.x + box.width / 2,
      box.y + box.height / 2 + 16,
      box.width - 16
    );
    ctx.globalAlpha = 1;
  }

  return canvas.toDataURL("image/png");
}
