import 'dotenv/config';
import { prisma } from '../src/lib/prisma';

async function main() {
    const doc = await prisma.doc.findFirst({
        where: { slug: 'two-sum' }
    });

    if (!doc) {
        console.log('Doc not found');
        return;
    }

    const newContent = `
<DsaHeader title="Two Sum" difficulty="Easy" timeComplexity="O(n)" spaceComplexity="O(n)" />

Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

### Approach

We can use a hash map to store the complement of each number.

<CodeTabs tabs={[{ label: "TypeScript", language: "typescript", code: "function twoSum(nums, target) {\\n  const map = new Map();\\n  for(let i=0; i<nums.length; i++) {\\n    const diff = target - nums[i];\\n    if(map.has(diff)) return [map.get(diff), i];\\n    map.set(nums[i], i);\\n  }\\n}" }]} />

\`\`\`typescript {4, 7-9}
function twoSum(nums: number[], target: number): number[] {
    const map = new Map<number, number>();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement)!, i];
        }
        map.set(nums[i], i);
    }
    return [];
}
\`\`\`

<ComplexitySection time="O(n)" space="O(n)" explanation="We traverse the list containing n elements only once. Each lookup in the table costs only O(1) time." />
`;

    await prisma.doc.update({
        where: { id: doc.id },
        data: { content: newContent }
    });

    console.log('Test doc updated with code blocks');
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
