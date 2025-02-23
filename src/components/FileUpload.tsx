import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/utils/uploadthing";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Image as ImageIcon, X, Upload } from "lucide-react";

export default function Home() {
  const [uploads, setUploads] = useState<{ fileUrl: string }[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleUploadComplete = (res: any) => {
    setUploads(res);
    toast({
      title: "Success!",
      description: `Successfully uploaded ${res.length} ${res.length === 1 ? 'file' : 'files'}`,
    });
  };

  const handleUploadError = (error: any) => {
    console.error("Upload error:", error);
    toast({
      title: "Upload failed",
      description: error?.message || "Please try again",
      variant: "destructive",
    });
  };

  const handleClearUploads = () => {
    setUploads([]);
    toast({
      title: "Cleared",
      description: "All uploads have been cleared",
    });
  };

  return (
    <div className="min-h-[400px] flex items-center justify-center bg-black p-4">
      <Card className="w-full max-w-lg bg-zinc-950 border-zinc-800">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Images
            </CardTitle>
            {uploads.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearUploads}
                className="text-zinc-400 hover:text-white"
              >
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>
          <CardDescription className="text-zinc-400">
            Drop your images here or click to browse
          </CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <div 
            className={`
              border-2 border-dashed rounded-lg p-6 transition-colors
              ${isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-zinc-800'}
              ${isUploading ? 'opacity-50' : ''}
            `}
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            onDragOver={(e) => e.preventDefault()}
          >
            {isUploading ? (
              <div className="flex flex-col items-center justify-center gap-3">
                <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
                <p className="text-sm text-zinc-400">Uploading your images...</p>
                <Progress className="w-2/3" value={66} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3">
                <ImageIcon className="h-12 w-12 text-zinc-500" />
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
                  onUploadBegin={() => {
                    setIsUploading(true);
                    setIsDragging(false);
                  }}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
