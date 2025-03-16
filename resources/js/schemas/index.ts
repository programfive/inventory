import * as z from "zod";

export const exportSchema = z.object({
  format: z.enum(["pdf", "excel", "json"], {
    required_error: "Selecciona un formato",
  }),
  startDate: z.date({
    required_error: "La fecha inicial es requerida",
  }),
  endDate: z.date({
    required_error: "La fecha final es requerida",
  }),
}).refine((data) => {
  return data.endDate >= data.startDate;
}, {
  message: "La fecha final debe ser posterior a la fecha inicial",
  path: ["endDate"],
});

export const productSchema = z.object({
  name: z.string()
    .min(1, { message: "El nombre es obligatorio" })
    .max(100, { message: "El nombre no puede exceder los 100 caracteres" }),
  description: z.string().optional(),
  purchase_price: z.string()
    .min(1, { message: "El precio de compra es obligatorio" })
    .refine(val => !isNaN(parseFloat(val)), {
      message: "El precio de compra debe ser un número válido",
    })
    .refine(val => parseFloat(val) >= 0, {
      message: "El precio de compra no puede ser menor a 0",
    }),
  sale_price: z.string()
    .min(1, { message: "El precio de venta es obligatorio" })
    .refine(val => !isNaN(parseFloat(val)), {
      message: "El precio de venta debe ser un número válido",
    })
    .refine(val => parseFloat(val) >= 0, {
      message: "El precio de venta no puede ser menor a 0",
    }),
  is_excluded: z.boolean().default(false),
});