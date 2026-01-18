import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
    const connectionString = process.env.DATABASE_URL;
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    const prismaClient = new PrismaClient({ adapter });

    try {
        // 1. Get admin user
        const admin = await prismaClient.user.findFirst({
            where: { role: 'admin' }
        });

        if (!admin) {
            console.error("Admin user not found. Run create-admin.ts first.");
            return;
        }

        // 2. Create/Get DSA Folder
        let dsaFolder = await prismaClient.docFolder.findFirst({
            where: { parentId: null, slug: 'dsa' }
        });

        if (!dsaFolder) {
            dsaFolder = await prismaClient.docFolder.create({
                data: {
                    name: 'DSA',
                    slug: 'dsa',
                    description: 'Data Structures and Algorithms',
                }
            });
        }

        // 3. Create a test problem
        const content = `
<DsaHeader 
    title="Two Sum" 
    difficulty="Easy" 
    timeComplexity="O(n)" 
    spaceComplexity="O(n)" 
/>

Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

### Complexity Analysis

<ComplexitySection 
    time="O(n)" 
    timeExplanation="We traverse the list containing n elements only once. Each lookup in the hash table costs only O(1) time."
    space="O(n)"
    spaceExplanation="The extra space required depends on the number of items stored in the hash table, which stores at most n elements."
/>

### Implementation

<CodeTabs 
    tabs={[
        {
            label: "TypeScript",
            language: "typescript",
            code: "function twoSum(nums: number[], target: number): number[] {\\n    const map = new Map<number, number>();\\n    for (let i = 0; i < nums.length; i++) {\\n        const complement = target - nums[i];\\n        if (map.has(complement)) {\\n            return [map.get(complement)!, i];\\n        }\\n        map.set(nums[i], i);\\n    }\\n    return [];\\n}"
        },
        {
            label: "Python",
            language: "python",
            code: "def twoSum(nums: List[int], target: int) -> List[int]:\\n    prevMap = {}\\n    for i, n in enumerate(nums):\\n        diff = target - n\\n        if diff in prevMap:\\n            return [prevMap[diff], i]\\n        prevMap[n] = i\\n    return []"
        }
    ]}
/>
`;

        const docSlug = 'two-sum';
        let doc = await prismaClient.doc.findFirst({
            where: { folderId: dsaFolder.id, slug: docSlug }
        });

        if (doc) {
            await prismaClient.doc.update({
                where: { id: doc.id },
                data: { content, published: true }
            });
        } else {
            await prismaClient.doc.create({
                data: {
                    title: 'Two Sum',
                    slug: docSlug,
                    description: 'Find two numbers that add up to a specific target.',
                    content,
                    published: true,
                    folderId: dsaFolder.id,
                    authorId: admin.id,
                    tags: ['array', 'hash-table', 'easy'],
                }
            });
        }

        console.log("Seed data created successfully!");
    } catch (error) {
        console.error("Seed failed:", error);
    } finally {
        await prismaClient.$disconnect();
        await pool.end();
    }
}

main();
