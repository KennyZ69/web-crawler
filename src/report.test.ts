import { sortPages } from './report';

test('sortPages', () => {
    const input = {
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev': 3,
        'https://wagslane.dev/path3': 9,
        'https://wagslane.dev/path2': 5,
        'https://wagslane.dev/path1': 4
    };
    const current = sortPages(input);
    const expected = [
        ['https://wagslane.dev/path3', 9],
        ['https://wagslane.dev/path2', 5],
        ['https://wagslane.dev/path1', 4],
        ['https://wagslane.dev', 3],
        ['https://wagslane.dev/path', 1]
    ];
    expect(current).toEqual(expected);
})