// core/events.ts

import { navigate } from "../router";

type Action = (e?: any) => void;

const clickActions: Record<string, Action> = {};
const keyActions: Record<string, Action> = {};
const submitActions: Record<string, Action> = {};
const inputActions: Record<string, Action> = {};

export function registerClick(key: string, action: Action) {
  clickActions[key] = action;
}

export function registerKeydown(key: string, action: Action) {
  keyActions[key] = action;
}

export function registerSubmit(key: string, action: Action) {
  submitActions[key] = action;
}

export function registerInput(key: string, action: Action) {
  inputActions[key] = action;
}

// 1 SEUL listener global pour tous les clicks
document.addEventListener("click", (e: Event) => {
  const target = e.target as HTMLElement;
  const key = target.dataset.action;
  if (key && clickActions[key])
    clickActions[key](e);
  if (target.dataset.route)
    navigate(target.dataset.route);
});

// 1 SEUL listener global pour tous les keydown
document.addEventListener("keydown", (e: Event) => {
  const target = e.target as HTMLElement;
  const key = target.dataset.action;
  if (key && keyActions[key])
    keyActions[key](e);
});

// 1 SEUL listener global pour tous les submit
document.addEventListener("submit", (e: Event) => {
  const form = e.target as HTMLFormElement;
  const key = form.dataset.action;
  if (key && submitActions[key]) {
    e.preventDefault();
    submitActions[key](e);
  }
});

// 1 SEUL listener global pour tous les input
document.addEventListener("input", (e: Event) => {
  const target = e.target as HTMLElement;
  const key = target.dataset.action;
  if (key && inputActions[key])
    inputActions[key](e);
});
// Ajouter d'autres types d'événements si nécessaire


