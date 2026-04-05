import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock } from 'lucide-react';
import { RichText } from './rich-text';

export function WebinarDetail({ product }: { product: any }) {
  const scheduledDate = product.webinar?.scheduledAt ? new Date(product.webinar.scheduledAt) : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 space-y-8">
        <div>
          <Badge className="mb-4">WEBINAR</Badge>
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <RichText content={product.description} />
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
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3 text-muted-foreground">
              <CalendarDays className="h-5 w-5" />
              <span>{scheduledDate ? scheduledDate.toLocaleDateString('en-US', { dateStyle: 'long' }) : 'TBA'}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Clock className="h-5 w-5" />
              <span>{scheduledDate ? scheduledDate.toLocaleTimeString('en-US', { timeStyle: 'short' }) : 'TBA'}</span>
            </div>
          </div>

          <div className="text-3xl font-bold mb-6">
            ${(product.price / 100).toFixed(2)}
          </div>

          <Button className="w-full size-lg text-lg">Register for Webinar</Button>
          <p className="text-center text-xs text-muted-foreground mt-4">
            Link to join will be sent after registration.
          </p>
        </div>
      </div>
    </div>
  );
}
