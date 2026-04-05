import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function ProductCard({ product }: { product: any }) {
  return (
    <Card className='overflow-hidden flex flex-col h-full'>
      <div className='aspect-video relative overflow-hidden bg-muted'>
        {product.coverImage ? (
          <img
            src={product.coverImage}
            alt={product.title}
            className='object-cover w-full h-full transition-transform hover:scale-105'
          />
        ) : (
          <div className='flex items-center justify-center h-full text-muted-foreground'>
            No Image
          </div>
        )}
        <Badge className='absolute top-2 right-2' variant='secondary'>
          {product.type.replace('_', ' ')}
        </Badge>
      </div>
      <CardHeader>
        <CardTitle className='line-clamp-1'>{product.title}</CardTitle>
      </CardHeader>
      <CardContent className='flex-grow'>
        <p className='text-2xl font-bold'>
          ${(product.price / 100).toFixed(2)}
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild className='w-full'>
          <Link href={`/products/${product.slug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
