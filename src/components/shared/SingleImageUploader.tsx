"use client"

import { useEffect, type Dispatch, type SetStateAction } from "react"
import Image from "next/image"
import { AlertCircleIcon, ImageUpIcon, XIcon } from "lucide-react"
import { useFileUpload } from "@/app/hooks/use-file-upload"



type Props = {
  onChange: Dispatch<SetStateAction<File | null>>
}

export default function SingleImageUploader({ onChange }: Props) {
  const maxSizeMB = 5
  const maxSize = maxSizeMB * 1024 * 1024

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
    accept: "image/*",
    maxSize,
    multiple: false,
  })

  useEffect(() => {
    const firstFile = files[0]?.file

    if (firstFile instanceof File) {
      onChange(firstFile)
    } else {
      onChange(null)
    }
  }, [files, onChange])

  const previewUrl = files[0]?.preview || null

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        {/* Drop Area */}
        <div
          role="button"
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors"
        >
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload file"
          />

          {previewUrl ? (
            <div className="absolute inset-0">
              <Image
                src={previewUrl}
                alt={files[0]?.file?.name || "Uploaded image"}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
              <div className="bg-background mb-2 flex size-11 items-center justify-center rounded-full border">
                <ImageUpIcon className="size-4 opacity-60" />
              </div>
              <p className="mb-1.5 text-sm font-medium">
                Drop your image here or click to browse
              </p>
              <p className="text-muted-foreground text-xs">
                Max size: {maxSizeMB}MB
              </p>
            </div>
          )}
        </div>

        {/* Remove Button */}
        {previewUrl && (
          <div className="absolute top-4 right-4">
            <button
              type="button"
              onClick={() => { const fileId = files[0]?.id; if (fileId) removeFile(fileId) }}
              className="z-50 flex size-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
              aria-label="Remove image"
            >
              <XIcon className="size-4" />
            </button>
          </div>
        )}
      </div>

      {/* Error */}
      {errors.length > 0 && (
        <div className="text-destructive flex items-center gap-1 text-xs" role="alert">
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  )
}

