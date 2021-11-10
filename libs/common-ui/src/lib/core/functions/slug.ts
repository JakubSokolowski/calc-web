import { latinize } from './latinize';

export function getSlug(text: string): string {
    const slug = text.trim().toLowerCase();
    return latinize(slug).replace(/\W/g, '-');
}
