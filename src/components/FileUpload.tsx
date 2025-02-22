"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/utils/uploadthing";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [uploads, setUploads] = useState<{ fileUrl: string }[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleUploadComplete = (res: any) => {
    setUploads(res);
    toast({
      title: "Upload complete!",
      description: "Your files have been uploaded successfully.",
    });
  };

  const handleUploadError = (error: any) => {
    console.error("Upload error:", error);
    toast({
      title: "Upload error",
      description: error?.message || "Something went wrong during upload.",
      variant: "destructive",
    });
  };

  const handleClearUploads = () => {
    setUploads([]);
  };

  return (
    <div className="min-h-[400px] flex items-center justify-center bg-black p-4">
      <Card className="w-full max-w-lg aspect-video bg-zinc-950 border-zinc-800">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl text-white">Upload Images</CardTitle>
          <CardDescription className="text-zinc-400">
            Drop your images here
          </CardDescription>
        </CardHeader>
        <CardContent className="relative">
          {isUploading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-10">
              <Loader2 className="animate-spin h-8 w-8 text-white" />
              <Progress className="w-1/2 mt-2" value={undefined} />
            </div>
          )}
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setIsUploading(false);
              handleUploadComplete(res);
            }}
            onUploadError={(error) => {
              setIsUploading(false);
              handleUploadError(error);
            }}
          />
          {uploads.length > 0 && (
            <div className="mt-4 space-y-2">
              <h4 className="text-sm font-medium text-zinc-200">Uploaded Files</h4>
              <ul className="space-y-1">
                {uploads.map((file, index) => (
                  <li key={index} className="text-xs text-zinc-400 break-all">
                    {file.fileUrl}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleClearUploads}
            variant="secondary" 
            className="w-full bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
          >
            Clear Uploads
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}