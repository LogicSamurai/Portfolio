import { Metadata } from 'next';

const siteConfig = {
    name: 'SyntaxSamurai',
    description: 'Expert Full-Stack Developer specializing in high-performance digital architecture and neo-noir design.',
    url: 'https://syntaxsamurai.com',
    ogImage: 'https://syntaxsamurai.com/og-image.jpg',
    links: {
        twitter: 'https://twitter.com/syntaxsamurai',
        github: 'https://github.com/syntaxsamurai',
    },
};

export function constructMetadata({
    title = siteConfig.name,
    description = siteConfig.description,
    image = siteConfig.ogImage,
    noIndex = false,
}: {
    title?: string;
    description?: string;
    image?: string;
    noIndex?: boolean;
} = {}): Metadata {
    return {
        title: {
            default: title,
            template: `%s | ${siteConfig.name}`,
        },
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: image,
                },
            ],
            url: siteConfig.url,
            siteName: siteConfig.name,
            locale: 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
            creator: '@syntaxsamurai',
        },
        icons: {
            icon: '/favicon.ico',
            shortcut: '/favicon.ico',
            apple: '/favicon.ico',
        },
        metadataBase: new URL(siteConfig.url),
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    };
}
