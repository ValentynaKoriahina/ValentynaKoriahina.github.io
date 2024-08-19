// Импортируем данные из JavaScript модуля
import { books, bible } from './bible.js';

// Создаёт объект с количеством глав и стихов для каждой книги
export let booksChaptersVerses: Record<string, Record<number, number>> = countBooksChaptersVerses();

/**
 * Подсчитывает количество глав и стихов в каждой книге Библии
 * @returns {Record<string, Record<number, number>>} Объект, где ключи — названия книг, а значения — объект с количеством стихов по главам
 */
function countBooksChaptersVerses(): Record<string, Record<number, number>> {
    let booksChaptersVerses: Record<string, Record<number, number>> = {};

    for (const book in bible) {
        let result: Record<number, number> = {};

        for (const i in bible[book]) {
            let verses = 0;
            for (const _ in bible[book][i]) {
                verses += 1;
            }
            // Запоминаем количество стихов в текущей главе
            const chapter = Number(i) + 1;
            result[chapter] = verses;
        }

        // Сохраняем результат для текущей книги
        booksChaptersVerses[books[book][0]] = result;
    }
    console.log(booksChaptersVerses);
    return booksChaptersVerses;
}

// Определяем интерфейс для ссылки на стих
interface BibleReference {
    book: string;
    chapter: number;
    verses: number[];
}

/**
 * Получает текст стихов по ссылкам
 * @param {BibleReference[]} references Массив объектов с ссылками на стихи
 * @returns {string} HTML-строка с текстом стихов
 */
export function processReferences(references: BibleReference[]): string {
    let results: string[] = [];

    references.forEach(ref => {
        const book = mapBookName(ref.book);
        const { chapter, verses } = ref;

        if (book && bible.hasOwnProperty(book)) {
            const chapters = bible[book];
            if (chapter - 1 < chapters.length) {
                const chapterVerses = chapters[chapter - 1];
                verses.forEach(verseNumber => {
                    if (verseNumber - 1 < chapterVerses.length) {
                        results.push(`(${chapter}:${verseNumber}) ${chapterVerses[verseNumber - 1]}`);
                    } else {
                        results.push(`(${chapter}:${verseNumber}) Стих не найден`);
                    }
                });
            } else {
                results.push(`(${book} ${chapter}) Глава не найдена`);
            }
        } else {
            results.push(`(${book}) Книга не найдена`);
        }
    });

    return results.join('<br>');
}

/**
 * Преобразует название книги в ключ объекта `bible`
 * @param {string} value Название книги
 * @returns {string | null} Ключ книги в объекте `bible` или `null`, если книга не найдена
 */
export function mapBookName(value: string): string | null {
    for (const [key, val] of Object.entries(books)) {
        if (val[0] === value) {
            return key;
        }
    }
    return null;
}

/**
 * Получает текст стихов по ссылке
 * @param {string} reference Ссылка на стих
 * @returns {string} HTML-строка с текстом стихов
 */
export function getVerse(reference: string): string {
    let parsedRef = parseBibleReference(reference);
    return processReferences(parsedRef);
}

/**
 * Разбирает ссылку на стихи и возвращает структурированные данные
 * @param {string} reference Ссылка на стих
 * @returns {BibleReference[]} Массив объектов с книгой, главой и стихами
 */
function parseBibleReference(reference: string): BibleReference[] {
    // Регулярное выражение для разбора ссылок на Библию
    const regex = /([\d]*\s*[^\d,]+)\s*(\d+):(\d+(?:-\d+)?(?:,\s*\d+(?:-\d+)?)*)/g;

    const matches: BibleReference[] = [];
    let match: RegExpExecArray | null;

    // Используем регулярное выражение для поиска всех ссылок
    while ((match = regex.exec(reference)) !== null) {
        const book = match[1].trim();
        const chapter = parseInt(match[2], 10);
        const verses: number[] = [];

        // Разбираем строки стихов
        const verseRanges = match[3].split(',');
        for (let range of verseRanges) {
            const [start, end] = range.split('-').map(v => parseInt(v.trim(), 10));
            if (end !== undefined) {
                for (let i = start; i <= end; i++) {
                    verses.push(i);
                }
            } else {
                verses.push(start);
            }
        }

        matches.push({
            book,
            chapter,
            verses: Array.from(new Set(verses)) // Убираем дубли
        });
    }

    // Копируем имя книги из первого элемента в пустые
    if (matches.length > 0) {
        const firstBook = matches[0].book;

        for (let i = 1; i < matches.length; i++) {
            if (!matches[i].book || matches[i].book === '-') {
                matches[i].book = firstBook;
            }
        }
    }

    return matches;
}
