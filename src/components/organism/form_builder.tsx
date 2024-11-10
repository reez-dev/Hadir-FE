import { FormField, RsFormData } from "@/core/types/form_props";
import { useEffect, useState } from "react";
import RsButton from "../atom/button";
import InputField from "../molecul/form/input";

interface GenericFormProps {
  fields: FormField[];
  onSubmit: (data: RsFormData) => void;
}

export default function GenericForm({ fields, onSubmit }: GenericFormProps) {
  const [formData, setFormData] = useState<RsFormData>(
    fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]: field.type === "checkbox" ? [] : "",
      }),
      {}
    )
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [optionsData, setOptionsData] = useState<
    Record<string, { value: string; label: string }[]>
  >({});

  useEffect(() => {
    fields.forEach(async (field) => {
      if (field.getAPI) {
        try {
          const response = await fetch(field.getAPI);
          const fetchedData = await response.json();
          const mappedOptions = fetchedData.map(
            (item: Record<string, unknown>) => ({
              value: item[field.fieldValue || "value"],
              label: item[field.fieldAlias || "label"],
            })
          );
          setOptionsData((prev) => ({ ...prev, [field.name]: mappedOptions }));
        } catch (error) {
          console.error("Error fetching options from API:", error);
        }
      }
    });
  }, [fields]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...(prev[name] as string[]), value]
          : (prev[name] as string[]).filter((v) => v !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value as unknown as object }));
    }

    const field = fields.find((f) => f.name === name);
    if (field) {
      const result = field.validation.safeParse(formData[field.name]);
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.errors.forEach((err) => {
          fieldErrors[field.name] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        setErrors({});
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let allValid = true;
    const fieldErrors: Record<string, string> = {};
    fields.forEach((field) => {
      const result = field.validation.safeParse(formData[field.name]);
      if (!result.success) {
        allValid = false;
        result.error.errors.forEach((err) => {
          fieldErrors[field.name] = err.message;
        });
      }
    });

    if (allValid) {
      setErrors({});
      onSubmit(formData);
    } else {
      setErrors(fieldErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => {
        if (field.type === "radio" || field.type === "checkbox") {
          const options = field.options || optionsData[field.name] || [];
          return (
            <div key={field.name} className="mt-4 w-full sm:w-[250px]">
              <label className="text-xs font-bold text-gray-100/80">
                {field.label}
              </label>
              {options.map((option) => (
                <div key={option.value} className="mt-1 flex items-center">
                  <input
                    type={field.type}
                    name={field.name}
                    value={option.value}
                    checked={
                      field.type === "radio"
                        ? (formData[field.name] as unknown as string) ===
                          option.value
                        : (formData[field.name] as string[]).includes(
                            option.value
                          )
                    }
                    onChange={handleInputChange}
                  />
                  <span className="ml-2 text-xs text-gray-100">
                    {option.label}
                  </span>
                </div>
              ))}
              {errors[field.name] && (
                <p className="text-xs text-red-500 mt-1">
                  {errors[field.name]}
                </p>
              )}
            </div>
          );
        }

        return (
          <InputField
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder || ""}
            value={formData[field.name] as unknown as string}
            onChange={handleInputChange}
            error={errors[field.name]}
            icon={field.icon}
          />
        );
      })}
      <RsButton className="w-full mt-4" text="Submit" />
    </form>
  );
}
