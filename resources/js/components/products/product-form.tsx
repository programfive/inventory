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
import { productSchema } from "@/schemas";
import Heading from "@/components/heading";
import { router, usePage, useForm as useFormInertia } from '@inertiajs/react';
import { Product } from "@/types";

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  product?: Product; 
  isEditing?: boolean;
  viewOnly?: boolean; 
}

export function ProductForm({ product, isEditing = false, viewOnly = false }: ProductFormProps) {
    const { errors } = usePage().props;
    const defaultValues: Partial<ProductFormValues> = {
        name: product?.name || "",
        description: product?.description || "",
        purchase_price: product?.purchase_price?.toString() || "",
        sale_price: product?.sale_price?.toString() || "",
        is_excluded: product?.is_excluded ? true : false,
    };

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues,
    });

    useEffect(() => {
        if (errors.name) {
        form.setError("name", {
            type: "manual",
            message: errors.name,
        });
        }
    }, [errors, form]);

    function onSubmit(values: ProductFormValues) {
        if (viewOnly) return; 
        
        const formattedValues = {
        ...values,
        purchase_price: parseFloat(values.purchase_price),
        sale_price: parseFloat(values.sale_price),
        };

        if (isEditing && product?.id) {
          router.put(`/administration/products/${product.id}/update`, formattedValues);
        } else {
          router.post('/administration/products/create', formattedValues);
        }
    }

    const getHeadingDetails = () => {
        if (viewOnly) {
            return {
                title: "Detalles del producto",
                description: "Visualización de la información del producto"
            };
        } else if (isEditing) {
            return {
                title: "Editar producto",
                description: "Modifica los detalles del producto"
            };
        } else {
            return {
                title: "Crear producto",
                description: "Añade un nuevo producto al inventario"
            };
        }
    };

    const headingDetails = getHeadingDetails();

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-3xl w-full md:px-4">
          <Heading title={headingDetails.title} description={headingDetails.description} />
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Nombre del producto" 
                    {...field} 
                    readOnly={viewOnly} 
                    className={viewOnly ? "opacity-100 cursor-default" : ""}
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Descripción del producto" 
                    className={`min-h-24 ${viewOnly ? "opacity-100 cursor-default" : ""}`} 
                    {...field} 
                    readOnly={viewOnly}
                  />
                </FormControl>
                {!viewOnly && (
                  <FormDescription>
                    Proporciona una descripción detallada del producto (opcional).
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="purchase_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio de Compra</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01" 
                      placeholder="0.00" 
                      {...field} 
                      readOnly={viewOnly}

                      className={viewOnly ? "opacity-100 cursor-default" : ""}
                    />
                  </FormControl>
                  {!viewOnly && (
                    <FormDescription>
                      Precio al que se adquiere el producto.
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="sale_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio de Venta</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01" 
                      placeholder="0.00" 
                      {...field} 
                      readOnly={viewOnly}

                      className={viewOnly ? "opacity-100 cursor-default" : ""}
                    />
                  </FormControl>
                  {!viewOnly && (
                    <FormDescription>
                      Precio al que se venderá el producto.
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="is_excluded"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={viewOnly ? undefined : field.onChange}
                    className={viewOnly ? "cursor-default" : ""}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Excluir Producto</FormLabel>
                  {!viewOnly && (
                    <FormDescription>
                      Marque esta casilla para excluir el producto de listados y reportes.
                    </FormDescription>
                  )}
                </div>
              </FormItem>
            )}
          />
          
          <div className="flex justify-center flex-col sm:flex-row gap-4 sm:justify-start">
            {!viewOnly ? (
              <>
                <Button type="submit" className="w-full sm:w-auto">
                  {isEditing ? "Actualizar" : "Guardar"}
                </Button>
                <Button type="button" variant='outline' onClick={() => {
                  router.get('/administration/products');
                }} className="w-full sm:w-auto">
                  Cancelar
                </Button>
              </>
            ) : (
              <Button type="button" variant='outline' onClick={() => {
                router.get('/administration/products');
              }} className="w-full sm:w-auto">
                Volver
              </Button>
            )}
          </div>
        </form>
      </Form>
    );
}