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
export const supplierSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio").max(100, "El nombre no puede exceder 100 caracteres"),
  address: z.string().min(1, "La dirección es obligatoria").max(255, "La dirección no puede exceder 255 caracteres"), // Obligatorio
  phone: z.string().min(1, "El teléfono es obligatorio").max(20, "El teléfono no puede exceder 20 caracteres"), // Ahora es obligatorio
  email: z.string().min(1, "El correo electrónico es obligatorio").email("Correo electrónico inválido").max(100, "El correo no puede exceder 100 caracteres").optional(),
  contact_person: z.string().min(1, "La persona de contacto es requerida").max(100, "La persona de contacto no puede exceder 100 caracteres"), // Obligatorio
  nit: z.string().min(1, "El NIT es obligatorio").max(50, "El NIT no puede exceder 50 caracteres"), // Obligatorio
  notes: z.string().optional(),
  is_active: z.boolean(),
});