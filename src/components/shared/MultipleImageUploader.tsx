"use client";

import { useEffect, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import {
  AlertCircleIcon,
  ImageIcon,
  UploadIcon,
  XIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useFileUpload } from "@/app/hooks/use-file-upload";

type Props = {
  onChange: Dispatch<SetStateAction<File[]>>;
};

export default function MultipleImageUploader({ onChange }: Props) {
  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024;
  const maxFiles = 3;

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
    maxSize,
    multiple: true,
    maxFiles,
  });

  // Send only File[] to parent
  useEffect(() => {
    const imageList = files
      .map((item) => item.file)
      .filter((file): file is File => file instanceof File);
    onChange(imageList);

    // Cleanup object URLs
    return () => {
      files.forEach((file) => {
        if (file.preview?.startsWith("blob:")) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files, onChange]);

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Drop Area */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors ${isDragging ? "bg-accent/40" : ""
          } ${files.length === 0 ? "justify-center" : ""}`}
      >
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload image file"
        />

        {files.length > 0 ? (
          <div className="flex w-full flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">
                Uploaded Files ({files.length}/{maxFiles})
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={openFileDialog}
                disabled={files.length >= maxFiles}
                type="button"
              >
                <UploadIcon className="size-4 opacity-60 mr-1" />
                Add more
              </Button>
            </div>

            {/* Preview Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="relative aspect-square rounded-md overflow-hidden border"
                >
                  {file.preview ? (
                    <Image
                      src={file.preview}
                      alt={file.file.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted">
                      <ImageIcon className="size-6 opacity-60" />
                    </div>
                  )}

                  <Button
                    onClick={() => removeFile(file.id)}
                    size="icon"
                    type="button"
                    className="absolute -top-2 -right-2 size-6 rounded-full border-2 bg-background shadow"
                  >
                    <XIcon className="size-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center px-4 py-6">
            <div className="mb-3 flex size-11 items-center justify-center rounded-full border bg-background">
              <ImageIcon className="size-4 opacity-60" />
            </div>
            <p className="text-sm font-medium mb-1">
              Drag & drop images here
            </p>
            <p className="text-xs text-muted-foreground">
              SVG, PNG, JPG or GIF (max {maxSizeMB}MB each)
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={openFileDialog}
              type="button"
            >
              <UploadIcon className="size-4 opacity-60 mr-1" />
              Select images
            </Button>
          </div>
        )}
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <div
          className="flex items-center gap-1 text-xs text-destructive"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  );
}
