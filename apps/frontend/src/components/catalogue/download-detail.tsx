import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { RichText } from './rich-text';

export function DownloadDetail({ product }: { product: any }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 space-y-8">
        <div>
          <Badge className="mb-4">DIGITAL DOWNLOAD</Badge>
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <RichText content={product.description} />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Included Resources</h2>
          <div className="grid grid-cols-1 gap-3">
            {product.resources?.map((resource: any) => (
              <div key={resource.id} className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <span className="font-medium">{resource.title}</span>
                </div>
                <Badge variant="outline">Locked</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="border rounded-xl p-6 bg-card shadow-sm sticky top-24">
          {product.coverImage && (
            <img 
              src={product.coverImage} 
              alt={product.title} 
              className="w-full aspect-video object-cover rounded-lg mb-6" 
            />
          )}
          
          <div className="text-3xl font-bold mb-6">
            ${(product.price / 100).toFixed(2)}
          </div>

          <Button className="w-full size-lg text-lg gap-2">
            <Download className="h-5 w-5" />
            Purchase to Download
          </Button>
          <p className="text-center text-xs text-muted-foreground mt-4">
            Instant access to all files after purchase.
          </p>
        </div>
      </div>
    </div>
  );
}
