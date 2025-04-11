import { UseFormRegister } from "react-hook-form";
import { FormField } from '@/data/types';

interface EntryFieldProps {
    field: FormField;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>;
}

const EntryField: React.FC<EntryFieldProps> = ({ field, register }) => {
    return (
        <div className="space-y-1.5 mb-4">
            <label className="default-label text-sm font-medium flex items-center gap-2 text-primary-900">
                {field.icon && (
                    <span className="text-primary-400">
                        {field.icon}
                    </span>
                )}
                {field.label}
                {field.required && <span className="text-red-500 text-xs">*</span>}
                {field.maxLength && (
                    <span className="text-xs text-gray-400 italic font-normal ml-auto max-sm:hidden">
                        {field.maxLength} {field.type === "number" ? "" : "chars"}
                    </span>
                )}
            </label>

            <div className="relative group">
                {field.multiline ? (
                    <textarea
                        {...register(field.name, {
                            required: field.required,
                            maxLength: field.maxLength
                        })}
                        placeholder={field.placeholder}
                        className="default-field w-full min-h-[100px]"
                    />
                ) : (
                    <input
                        type={field.type || "text"}
                        {...register(field.name, {
                            required: field.required,
                            maxLength: field.maxLength
                        })}
                        placeholder={field.placeholder}
                        className="default-field w-full"
                    />
                )}
            </div>
        </div>
    );
};

export default EntryField;