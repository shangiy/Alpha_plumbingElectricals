'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare } from 'lucide-react';

interface ContactSellerFormProps {
    sellerName: string;
}

export default function ContactSellerForm({ sellerName }: ContactSellerFormProps) {
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically handle form submission, e.g., send an email.
    // For this example, we'll just show a success toast.
    toast({
      title: "Message Sent!",
      description: `Your message has been sent to ${sellerName}.`,
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="flex-1">
          <MessageSquare className="mr-2 h-5 w-5" /> Contact Seller
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Contact {sellerName}</DialogTitle>
            <DialogDescription>
              Have a question about the product? Send a message to the seller.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" defaultValue="Your Name" className="col-span-3" required/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" type="email" defaultValue="your.email@example.com" className="col-span-3" required/>
            </div>
             <div className="grid grid-cols-4 items-start gap-4">
               <Label htmlFor="message" className="text-right pt-2">
                Message
              </Label>
              <Textarea id="message" placeholder="Type your message here." className="col-span-3" required/>
            </div>
          </div>
          <DialogFooter>
             <DialogClose asChild>
                <Button type="submit">Send Message</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
