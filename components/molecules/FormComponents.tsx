import * as React from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Eye, EyeClosed, Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type CustomFormFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  type?: "text" | "password" | "email" | "number";
  className?: string;
  step?: number;
  min?: number;
  placeholder?: string;
};
export function CustomFormField<T extends FieldValues>({
  name,
  control,
  label,
  type,
  className,
  step,
  min,
  placeholder,
}: CustomFormFieldProps<T>) {
  const [visible, setVisible] = React.useState(false);
  const inputType =
    type === "password" ? (visible ? "text" : "password") : type;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{label ?? name}</FormLabel>
          <div className="relative">
            <FormControl className={className}>
              <Input
                {...field}
                type={inputType}
                step={step ?? undefined}
                min={min ?? undefined}
                placeholder={placeholder ?? undefined}
              />
            </FormControl>
            {type === "password" ? (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 hover:bg-none  hover:shadow-none cursor-pointer"
                onClick={() => setVisible((prev) => !prev)}
              >
                {visible ? <Eye /> : <EyeClosed />}
              </Button>
            ) : null}
          </div>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}

type CustomDateFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  labelText?: string;
  className?: string;
};
export function CustomDateField<T extends FieldValues>({
  name,
  control,
  labelText,
  className,
}: CustomDateFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const value = field.value
          ? field.value.toISOString().split("T")[0]
          : field.value
          ? String(field.value)
          : "";
        return (
          <FormItem>
            <FormLabel className="capitalize">{labelText ?? name}</FormLabel>
            <FormControl className={className}>
              <Input
                type="date"
                value={value}
                onChange={(event) => {
                  const nextValue = event.target.value;
                  field.onChange(nextValue ? new Date(nextValue) : undefined);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

type CustomFormSelectProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  items: string[];
  labelText?: string;
  className?: string;
};
export function CustomFormSelect<T extends FieldValues>({
  name,
  control,
  items,
  labelText,
  className,
}: CustomFormSelectProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{labelText || name}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl className={`w-full ${className}`}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items?.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
type CheckboxProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  labelText?: string;
};
export function CustomFormCheckbox<T extends FieldValues>({
  control,
  name,
  labelText,
}: CheckboxProps<T>) {
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    checked: boolean,
    onChange: (value: boolean) => void
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onChange(!checked);
    }
  };
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <label className="grid gap-2 cursor-pointer select-none text-sm font-normal">
              <span>{labelText || name}</span>

              <input
                type="checkbox"
                className="sr-only peer"
                checked={field.value}
                onChange={(event) => field.onChange(event.target.checked)}
                onKeyDown={(event) =>
                  handleKeyDown(event, field.value, field.onChange)
                }
              />
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-primary/60 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-primary ${
                  field.value
                    ? "bg-primary text-background border-primary shadow-sm"
                    : "border-primary/40 bg-transparent"
                }`}
                aria-hidden="true"
              >
                {field.value ? <Check className="h-3 w-3" /> : null}
              </span>
            </label>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
