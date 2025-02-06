// sanitizeUtils.ts
export function sanitizeContent(content: string): string {
    const allowedTags = ['<p>', '<br>', '<b>', '<i>', '<strong>'];

    content = content.replace( /<script.*?>.*?<\/script>|<iframe.*?>.*?<\/iframe>|on[a-z]+=["'][^"']*["']/gi, '')
                
    content = content.replace(/<\/?([a-zA-Z0-9]+)[^>]*>/g, (match, tag) => {
        
        return allowedTags.includes(`<${tag}>`) ? match : '';
    });

    return content;
}
