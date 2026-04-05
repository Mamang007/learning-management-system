import { apiFetch } from '@/lib/api';
import { ProductCard } from '@/components/catalogue/product-card';

export default async function ProductsPage() {
  let products = [];
  try {
    products = await apiFetch('/catalogue');
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col space-y-4 mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Our Catalogue</h1>
        <p className="text-xl text-muted-foreground">
          Explore our wide range of webinars, video courses, and digital materials.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border rounded-lg border-dashed">
          <p className="text-lg text-muted-foreground">No products found in the catalogue.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
