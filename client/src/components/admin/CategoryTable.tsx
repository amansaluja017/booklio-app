import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import apiClient from "@/utilis/apiClient";
import { Trash2, Loader } from "lucide-react";

export function CategoryTable() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getCategories();
      const data = response as {data: { categories: any[] }};
      setCategories(data.data.categories || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (categoryId: string) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }

    try {
      setDeleting(categoryId);
      await apiClient.deleteCategory(categoryId);
      setCategories(categories.filter(cat => cat._id !== categoryId));
      alert("Category deleted successfully");
    } catch (error) {
      console.error("Failed to delete category:", error);
      alert("Failed to delete category");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading categories...</div>;
  }

  return (
    <Table>
      <TableCaption>Manage all service categories.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">Sr.</TableHead>
          <TableHead>Category Name</TableHead>
          <TableHead>Services</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories && categories.length > 0 ? (
          categories.map((category, index) => (
            <TableRow key={category._id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-semibold">{category.name}</TableCell>
              <TableCell>{category.services_name?.join(", ") || "No services"}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(category._id)}
                  disabled={deleting === category._id}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  {deleting === category._id ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-8 text-gray-500">
              No categories found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4} className="text-right">
            Total Categories: {categories.length}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
