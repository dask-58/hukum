"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, X, Image, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload an image file (JPG, PNG, etc.).",
        });
        return;
      }
      if (selectedFile.size > 12 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload an image smaller than 12MB.",
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please select an image file to upload.",
      });
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Image has been uploaded successfully.",
        });
        setFile(null);
      } else {
        const error = await response.text();
        throw new Error(error);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An error occurred while uploading.",
      });
    } finally {
      setUploading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Upload className="h-5 w-5 text-gray-400" />
          Upload Image
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="relative border-dashed border-2 border-white/10 hover:bg-white/5 w-full h-20"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              {file ? (
                <div className="flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-5 w-5" />
                  <span className="text-sm">Click to select image</span>
                </div>
              )}
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </Button>
            {file && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearFile}
                className="hover:bg-red-500/10 hover:text-red-400"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>

          {file && (
            <Button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full"
            >
              {uploading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Image
                </>
              )}
            </Button>
          )}

          <div className="text-sm text-gray-400 space-y-1">
            <p className="flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              Image Upload Guidelines:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-0.5">
              <li>Accepted formats: JPG, PNG, GIF</li>
              <li>Maximum file size: 5MB</li>
              <li>Recommended resolution: 1920x1080 or higher</li>
              <li>Keep the image well-lit and in focus</li>
              <li>Avoid blurry or compressed images</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}