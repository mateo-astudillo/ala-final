import type { Difficulty, Status } from "../types.js";

const STATUS_LABELS: Record<Status, string> = {
  "done": "Terminada",
  "in progress": "Pendiente",
  "to do": "En curso",
  "cancelled": "Cancelada"
}

export function statusLabels(status: Status) {
  return STATUS_LABELS[status];
}

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  "easy": "Fácil",
  "medium": "Medio",
  "hard": "Difícil"
}

export function difficultyLabels(difficulty: Difficulty) {
  return DIFFICULTY_LABELS[difficulty];
}
