import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlayCircle, Lock } from 'lucide-react';
import { RichText } from './rich-text';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function CourseDetail({ product }: { product: any }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 space-y-8">
        <div>
          <Badge className="mb-4">VIDEO COURSE</Badge>
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <RichText content={product.description} />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Course Curriculum</h2>
          <Accordion type="single" collapsible className="w-full">
            {product.sections?.map((section: any, index: number) => (
              <AccordionItem key={section.id} value={`section-${index}`}>
                <AccordionTrigger className="hover:no-underline">
                  <span className="font-bold">{section.title}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pt-2">
                    {section.lessons?.map((lesson: any) => (
                      <div key={lesson.id} className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <PlayCircle className="h-4 w-4 text-muted-foreground" />
                          <span>{lesson.title}</span>
                        </div>
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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

          <Button className="w-full size-lg text-lg">Enroll in Course</Button>
          <p className="text-center text-xs text-muted-foreground mt-4">
            Lifetime access to all course materials.
          </p>
        </div>
      </div>
    </div>
  );
}
