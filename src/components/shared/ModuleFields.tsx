/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ModuleFields({
    moduleIndex,
    control,
    register,
    removeModule,
}: any) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `modules.${moduleIndex}.lessons`,
    });

    return (
        <div className="border p-6 rounded-lg space-y-4">
            <div className="flex justify-between">
                <h3>Module {moduleIndex + 1}</h3>
                <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeModule(moduleIndex)}
                >
                    Remove Module
                </Button>
            </div>

            <Input
                {...register(`modules.${moduleIndex}.title`)}
                placeholder="Module Title"
            />

            <Input
                type="number"
                {...register(`modules.${moduleIndex}.order`)}
                placeholder="Order"
            />

            {/* Lessons */}
            {fields.map((lesson, lessonIndex) => (
                <div key={lesson.id} className="border p-4 rounded space-y-3">

                    <Input
                        {...register(
                            `modules.${moduleIndex}.lessons.${lessonIndex}.title`
                        )}
                        placeholder="Lesson Title"
                    />

                    <Input
                        {...register(
                            `modules.${moduleIndex}.lessons.${lessonIndex}.videoUrl`
                        )}
                        placeholder="Video URL"
                    />

                    <Input
                        type="number"
                        {...register(
                            `modules.${moduleIndex}.lessons.${lessonIndex}.duration`
                        )}
                        placeholder="Duration"
                    />

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            {...register(
                                `modules.${moduleIndex}.lessons.${lessonIndex}.isPreview`
                            )}
                        />
                        Preview
                    </label>

                    <Button
                        type="button"
                        variant="destructive"
                        onClick={() => remove(lessonIndex)}
                    >
                        Remove Lesson
                    </Button>
                </div>
            ))}

            <Button
                type="button"
                onClick={() =>
                    append({
                        title: "",
                        videoUrl: "",
                        duration: 0,
                        order: fields.length + 1,
                        isPreview: false,
                    })
                }
            >
                Add Lesson
            </Button>
        </div>
    );
}