import  { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import apiClient from "@/utilis/apiClient";
import { useNavigate, useSearchParams } from "react-router-dom";

interface Category {
  _id: string;
  name: string;
  services_name: string[];
}

function CategoryArea() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = (await apiClient.getCategories()) as {
          data: {categories: Category[]};
        };
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mt-10 p-3">
      <Card className="bg-gray-50 border-gray-200 shadow-lg">
        <CardHeader className="pb-4">
          <Button
            variant="ghost"
            onClick={toggleExpanded}
            className="w-full justify-between text-lg font-semibold text-gray-700 hover:bg-gray-100">
            Categories
            <ChevronDown
              className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
            />
          </Button>
        </CardHeader>
        {isExpanded && (
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <div
                  key={category._id}
                  onClick={() => {
                    params.set("query", category._id);
                    params.set("name", category.name);
                    navigate(`/category?${params.toString()}`);
                  }}
                  className="p-3 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
                  <h3
                    className="text-md font-medium text-gray-800">
                    {category.name}
                  </h3>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

export default CategoryArea;
