import { apiFetch } from '@/lib/api';
import { WebinarDetail } from '@/components/catalogue/webinar-detail';
import { CourseDetail } from '@/components/catalogue/course-detail';
import { DownloadDetail } from '@/components/catalogue/download-detail';
import { notFound } from 'next/navigation';

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  let product;
  try {
    product = await apiFetch(`/catalogue/${slug}`);
  } catch (error) {
    console.error(`Failed to fetch product with slug ${slug}:`, error);
    return notFound();
  }

  if (!product) {
    return notFound();
  }

  return (
    <div className="container mx-auto py-10 px-4">
      {product.type === 'WEBINAR' && <WebinarDetail product={product} />}
      {product.type === 'COURSE' && <CourseDetail product={product} />}
      {product.type === 'DIGITAL_DOWNLOAD' && <DownloadDetail product={product} />}
    </div>
  );
}
