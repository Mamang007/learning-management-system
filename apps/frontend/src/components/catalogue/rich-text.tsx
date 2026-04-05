export function RichText({ content }: { content: any }) {
  if (!content) return null;

  // Simple renderer for ProseMirror/Tiptap JSONB
  // Later this can be replaced with a more robust renderer
  const renderNode = (node: any, index: number) => {
    switch (node.type) {
      case 'doc':
        return <div key={index}>{node.content?.map(renderNode)}</div>;
      case 'paragraph':
        return (
          <p key={index} className="mb-4 leading-relaxed">
            {node.content?.map(renderNode)}
          </p>
        );
      case 'text':
        return <span key={index}>{node.text}</span>;
      case 'heading':
        const Level = `h${node.attrs?.level || 1}` as keyof JSX.IntrinsicElements;
        const classes = {
          h1: 'text-3xl font-bold mb-6',
          h2: 'text-2xl font-bold mb-4',
          h3: 'text-xl font-bold mb-3',
        }[Level as string] || 'font-bold';
        return (
          <Level key={index} className={classes}>
            {node.content?.map(renderNode)}
          </Level>
        );
      default:
        console.warn('Unknown node type:', node.type);
        return null;
    }
  };

  return <div className="prose prose-slate max-w-none">{renderNode(content, 0)}</div>;
}
