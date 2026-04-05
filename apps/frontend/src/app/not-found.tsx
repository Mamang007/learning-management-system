import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion, Home, Library } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <div className="bg-muted rounded-full p-6 mb-6">
        <FileQuestion className="h-12 w-12 text-muted-foreground" />
      </div>
      
      <h1 className="text-6xl font-extrabold tracking-tighter mb-2">404</h1>
      <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
      
      <p className="text-muted-foreground max-w-[500px] mb-8 text-lg">
        Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild variant="default" size="lg" className="gap-2">
          <Link href="/">
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        
        <Button asChild variant="outline" size="lg" className="gap-2">
          <Link href="/products">
            <Library className="h-4 w-4" />
            Browse Catalogue
          </Link>
        </Button>
      </div>
    </div>
  );
}
