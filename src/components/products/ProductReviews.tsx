
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { Product, Review } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Rating } from '@/components/ui/rating';
import { Star, User } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const reviewFormSchema = z.object({
  rating: z.number().min(1, { message: 'Please select a rating.' }),
  comment: z.string().min(10, { message: 'Review must be at least 10 characters.' }).max(500, { message: 'Review cannot exceed 500 characters.' }),
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

interface InteractiveRatingProps {
  value: number;
  onChange: (value: number) => void;
  size?: number;
}

function InteractiveRating({ value, onChange, size = 24 }: InteractiveRatingProps) {
    const [hoverValue, setHoverValue] = useState(0);
  
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <button
              key={starValue}
              type="button"
              onMouseEnter={() => setHoverValue(starValue)}
              onMouseLeave={() => setHoverValue(0)}
              onClick={() => onChange(starValue)}
              className="cursor-pointer"
            >
              <Star
                className="transition-colors"
                fill={starValue <= (hoverValue || value) ? '#FFC107' : 'none'}
                stroke={starValue <= (hoverValue || value) ? '#FFC107' : '#A0A0A0'}
                style={{ width: size, height: size }}
              />
            </button>
          );
        })}
      </div>
    );
}

export default function ProductReviews({ product }: { product: Product }) {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>(product.reviewsList || []);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: { rating: 0, comment: '' },
  });

  const onSubmit = (data: ReviewFormValues) => {
    // In a real app, you would submit this to your backend
    const newReview: Review = {
        id: `rev-${Date.now()}`,
        author: 'Current User', // Replace with actual user data
        rating: data.rating,
        comment: data.comment,
        date: new Date().toISOString().split('T')[0],
        avatarUrl: '/profile-images/avatar5.png', // Replace with actual user avatar
    };
    
    setReviews([newReview, ...reviews]);
    form.reset();

    toast({
      title: 'Review Submitted!',
      description: 'Thank you for your feedback.',
    });
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Left side: Existing reviews */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold font-headline">Customer Reviews ({reviews.length})</h3>
        {reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="flex gap-4">
                <Avatar>
                  <AvatarImage src={review.avatarUrl} alt={review.author} />
                  <AvatarFallback><User /></AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{review.author}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(review.date)}</p>
                  </div>
                  <Rating rating={review.rating} size={16} className="my-1" />
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No reviews yet. Be the first to write one!</p>
        )}
      </div>

      {/* Right side: Review form */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
            <CardDescription>Share your thoughts about this product.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Rating</FormLabel>
                      <FormControl>
                        <InteractiveRating value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Review</FormLabel>
                      <FormControl>
                        <Textarea placeholder="What did you like or dislike?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  Submit Review
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
