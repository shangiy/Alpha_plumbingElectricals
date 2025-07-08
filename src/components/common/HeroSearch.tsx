'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Camera, Video, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AnimatedPlaceholder } from './AnimatedPlaceholder';
import { cn } from '@/lib/utils';

export default function HeroSearch() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const [isCameraDialogOpen, setIsCameraDialogOpen] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const placeholders = ["tanks", "chandelier", "solar heater", "ironsheet mabati"];

  const getCameraPermission = async () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setHasCameraPermission(null); // Reset permission state to show loading
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      setHasCameraPermission(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasCameraPermission(false);
      toast({
        variant: 'destructive',
        title: 'Camera Access Denied',
        description: 'Please enable camera permissions in your browser settings.',
      });
    }
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      
      const imageDataUrl = canvas.toDataURL('image/png');
      console.log('Captured Image Data URL:', imageDataUrl);
      
      toast({
        title: 'Image Captured!',
        description: 'Visual search is not yet implemented.',
      });
      setIsCameraDialogOpen(false); // Close dialog after capture
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/search');
    }
  };

  useEffect(() => {
    if (isCameraDialogOpen) {
      getCameraPermission();
    } else {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
        setHasCameraPermission(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCameraDialogOpen]);

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl">
        <div className="relative flex items-center w-full p-1 pr-2 space-x-1 bg-white border border-gray-200 rounded-full shadow-md">
          
          <div 
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none transition-opacity",
              query ? "opacity-0" : "opacity-100"
            )}
          >
            <span className="text-base text-muted-foreground">Search for&nbsp;</span>
            <AnimatedPlaceholder placeholders={placeholders} />
          </div>

          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder=""
            className="flex-1 pl-4 pr-4 text-base bg-transparent border-none appearance-none h-11 text-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Dialog open={isCameraDialogOpen} onOpenChange={setIsCameraDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" type="button" className="shrink-0 rounded-full">
                <Camera className="w-5 h-5 text-gray-500" />
                <span className="sr-only">Search by image</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Search by Image</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="w-full bg-black rounded-md overflow-hidden relative">
                  <video ref={videoRef} className="w-full aspect-video rounded-md" autoPlay playsInline muted />
                  <canvas ref={canvasRef} className="hidden" />
                  {hasCameraPermission === null && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                      <p>Requesting camera access...</p>
                    </div>
                  )}
                </div>
                {hasCameraPermission === false && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Camera Access Required</AlertTitle>
                    <AlertDescription>
                      Please allow camera access in your browser to use this feature.
                      <Button variant="link" className="p-0 h-auto ml-2" onClick={getCameraPermission}>Try Again</Button>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">Cancel</Button>
                </DialogClose>
                <Button type="button" onClick={handleCapture} disabled={!hasCameraPermission}>
                  <Video className="mr-2 h-4 w-4" /> Capture
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button type="submit" size="lg" className="h-11 rounded-full bg-[#28235f] hover:bg-[#28235f]/90 text-white">
            <Search className="w-5 h-5 mr-0 md:mr-2" />
            <span className="hidden md:inline">Search</span>
          </Button>
        </div>
      </form>
    </>
  );
}
