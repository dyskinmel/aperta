import { writable } from 'svelte/store';

export const cssStyleReader = writable(null);
export const cssEditMode = writable(false);
export const selectorToEdit = writable("");
export const selectorList = writable({});
export const pseudoList = writable({});