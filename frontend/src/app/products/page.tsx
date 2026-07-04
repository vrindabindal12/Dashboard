import { fetchProducts } from "@/lib/api";
import { ProductsTable } from "@/components/dashboard/products-table";

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <div className="animate-in fade-in duration-500">
      <ProductsTable initialProducts={products} />
    </div>
  );
}
