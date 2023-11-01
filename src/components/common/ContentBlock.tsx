import {PortableTextBlock} from '@portabletext/types';
import {PortableText, PortableTextComponents} from '@portabletext/react';

interface ContentBlockProps {
    content: PortableTextBlock[];
}

const components: PortableTextComponents = {
    marks: {
        link: ({value, children}) => {
            const target = (value?.href || '').startsWith('http')
                ? '_blank'
                : undefined;

            return (
                <a
                    href={value?.href}
                    target={target}
                    className="text-emerald-500 underline underline-offset-2"
                >
                    {children}
                </a>
            );
        }
    },
    list: {
        bullet: ({ children }) => (
            <ul className="list-disc list-inside marker:text-emerald-500 my-2">{children}</ul>
        )
    }
};

const ContentBlock = ({content}: ContentBlockProps) => {
    return (
        <PortableText
            value={content}
            components={components} />
    );
};
export default ContentBlock;