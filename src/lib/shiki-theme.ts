export const neoNoirTheme = {
    name: 'neo-noir',
    type: 'dark',
    colors: {
        'editor.background': '#000000',
        'editor.foreground': '#f8f8f2',
        'editor.selectionBackground': '#d4ff0033',
        'editor.lineHighlightBackground': '#111111',
        'editorCursor.foreground': '#d4ff00',
        'editorWhitespace.foreground': '#222222',
    },
    tokenColors: [
        {
            name: 'Keywords',
            scope: ['keyword', 'storage.type', 'storage.modifier'],
            settings: { foreground: '#d4ff00' },
        },
        {
            name: 'Comments',
            scope: ['comment', 'punctuation.definition.comment'],
            settings: { foreground: '#555555', fontStyle: 'italic' },
        },
        {
            name: 'Strings',
            scope: ['string'],
            settings: { foreground: '#ffffff' },
        },
        {
            name: 'Variables',
            scope: ['variable', 'variable.other', 'variable.parameter'],
            settings: { foreground: '#f8f8f2' },
        },
        {
            name: 'Functions',
            scope: ['entity.name.function', 'support.function'],
            settings: { foreground: '#ffffff', fontStyle: 'bold' },
        },
        {
            name: 'Constants',
            scope: ['constant.language', 'constant.numeric'],
            settings: { foreground: '#d4ff00', fontStyle: 'bold' },
        },
        {
            name: 'Tags',
            scope: ['entity.name.tag', 'meta.tag'],
            settings: { foreground: '#d4ff00' },
        },
        {
            name: 'Attributes',
            scope: ['entity.other.attribute-name'],
            settings: { foreground: '#ffffff' },
        },
    ],
};
