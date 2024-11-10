import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { ZodSchema } from "zod";

export type RsFormData = Record<string, object>;

export interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  icon?: IconDefinition;
  options?: Array<{ label: string; value: string }>;
  getAPI?: string;
  fieldValue?: string;
  fieldAlias?: string;
  validation: ZodSchema;
}
