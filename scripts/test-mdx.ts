import { compileMDX } from 'next-mdx-remote/rsc';
import React from 'react';

const source = `
<CodeTabs tabs={[
    { 
        label: "TypeScript", 
        language: "typescript", 
        code: "line1\\nline2" 
    }
]} />
`;

async function test() {
    try {
        const { content } = await compileMDX({
            source,
            components: {
                CodeTabs: () => null,
            },
            options: {
                parseFrontmatter: true,
            }
        });
        console.log('Success!');
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error('MDX Error:', e.message);
        } else {
            console.error('MDX Error:', String(e));
        }
    }
}

test();
