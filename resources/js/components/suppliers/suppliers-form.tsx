import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { supplierSchema } from "@/schemas";
import Heading from "@/components/heading";
import { router, usePage } from '@inertiajs/react';
import { Supplier } from "@/types";

type SupplierFormValues = z.infer<typeof supplierSchema>;

interface SupplierFormProps {
  supplier?: Supplier;
  isEditing?: boolean;
  viewOnly?: boolean;
}

export function SupplierForm({ supplier, isEditing = false, viewOnly = false }: SupplierFormProps) {
  const { errors } = usePage().props;
  const defaultValues: Partial<SupplierFormValues> = {
    name: supplier?.name || "",
    address: supplier?.address || "",
    phone: supplier?.phone || "",
    email: supplier?.email || "",
    contact_person: supplier?.contact_person || "",
    nit: supplier?.nit || "",
    notes: supplier?.notes || "",
    is_active: supplier?.is_active  ? true : false,
  };

  const form = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierSchema),
    defaultValues,
  });

  useEffect(() => {
    if (errors) {
      Object.keys(errors).forEach((field) => {
        form.setError(field as keyof SupplierFormValues, {
          type: "manual",
          message: errors[field],
        });
      });
    }
  }, [errors, form]);

  function onSubmit(values: SupplierFormValues) {
    if (viewOnly) return;

    if (isEditing && supplier?.id) {
      router.put(`/administration/suppliers/${supplier.id}/update`, values);
    } else {
      router.post('/administration/suppliers/create', values);
    }
  }

  const getHeadingDetails = () => {
    if (viewOnly) {
      return {
        title: "Detalles del proveedor",
        description: "Visualización de la información del proveedor",
      };
    } else if (isEditing) {
      return {
        title: "Editar proveedor",
        description: "Modifica los detalles del proveedor",
      };
    } else {
      return {
        title: "Crear proveedor",
        description: "Añade un nuevo proveedor al sistema",
      };
    }
  };

  const headingDetails = getHeadingDetails();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-3xl w-full md:px-4">
        <Heading title={headingDetails.title} description={headingDetails.description} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nombre del proveedor"
                      {...field}
                      readOnly={viewOnly}
                    />
                  </FormControl>
                  {!viewOnly && (
                    <FormDescription>
                      El nombre debe ser único y no exceder 100 caracteres.
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Dirección del proveedor"
                      {...field}
                      readOnly={viewOnly}
                    />
                  </FormControl>
                  {!viewOnly && (
                    <FormDescription>
                      Dirección física del proveedor (opcional).
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Teléfono del proveedor"
                      {...field}
                      readOnly={viewOnly}
                    />
                  </FormControl>
                  {!viewOnly && (
                    <FormDescription>
                      Número de teléfono del proveedor.
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Correo electrónico del proveedor"
                      {...field}
                      readOnly={viewOnly}
                    />
                  </FormControl>
                  {!viewOnly && (
                    <FormDescription>
                      Correo electrónico del proveedor (opcional).
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact_person"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Persona de contacto</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Persona de contacto"
                      {...field}
                      readOnly={viewOnly}
                    />
                  </FormControl>
                  {!viewOnly && (
                    <FormDescription>
                      Nombre de la persona de contacto (opcional).
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIT</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="NIT del proveedor"
                      {...field}
                      readOnly={viewOnly}
                    />
                  </FormControl>
                  {!viewOnly && (
                    <FormDescription>
                      Número de Identificación Tributaria (opcional).
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notas</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Notas adicionales"
                  {...field}
                  readOnly={viewOnly}
                />
              </FormControl>
              {!viewOnly && (
                <FormDescription>
                  Notas adicionales sobre el proveedor (opcional).
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 ">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={viewOnly ? undefined : field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Activo</FormLabel>
                {!viewOnly && (
                  <FormDescription>
                    Marque esta casilla para mantener al proveedor activo.
                  </FormDescription>
                )}
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-start gap-4">
          {!viewOnly ? (
            <>
              <Button type="submit" className="w-full sm:w-auto">
                {isEditing ? "Actualizar" : "Guardar"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.get('/administration/suppliers')}
                className="w-full sm:w-auto"
              >
                Cancelar
              </Button>
            </>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={() => router.get('/administration/suppliers')}
              className="w-full sm:w-auto"
            >
              Volver
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}