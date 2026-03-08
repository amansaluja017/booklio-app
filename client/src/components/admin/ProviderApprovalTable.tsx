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
import { CheckCircle, XCircle, Loader } from "lucide-react";

export function ProviderApprovalTable() {
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getAllProviders();
      const data = response as {data: { providers: any[] }};
      setProviders(data.data.providers || []);
    } catch (error) {
      console.error("Failed to fetch providers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (providerId: string) => {
    try {
      setProcessing(providerId);
      await apiClient.approveProvider(providerId);
      setProviders(
        providers.map(p =>
          p._id === providerId ? { ...p, isAprooved: true } : p
        )
      );
      
      alert("Provider approved successfully");
    } catch (error) {
      console.error("Failed to approve provider:", error);
      alert("Failed to approve provider");
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (providerId: string) => {
    if (!window.confirm("Are you sure you want to reject this provider?")) {
      return;
    }

    try {
      setProcessing(providerId);
      await apiClient.rejectProvider(providerId);
      setProviders(providers.filter(p => p._id !== providerId));
      alert("Provider rejected successfully");
    } catch (error) {
      console.error("Failed to reject provider:", error);
      alert("Failed to reject provider");
    } finally {
      setProcessing(null);
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading providers...</div>;
  }

  const unapprovedProviders = providers.filter(p => !p.isAprooved);

  return (
    <Table>
      <TableCaption>Approve or reject pending providers.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">Sr.</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Store</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {unapprovedProviders && unapprovedProviders.length > 0 ? (
          unapprovedProviders.map((provider, index) => (
            <TableRow key={provider._id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-semibold">{provider.name}</TableCell>
              <TableCell>{provider.email}</TableCell>
              <TableCell>{provider.store || "-"}</TableCell>
              <TableCell className="text-right flex gap-2 justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleApprove(provider._id)}
                  disabled={processing === provider._id}
                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                >
                  {processing === provider._id ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircle className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleReject(provider._id)}
                  disabled={processing === provider._id}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  {processing === provider._id ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-8 text-gray-500">
              No pending providers for approval
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5} className="text-right">
            Pending Providers: {unapprovedProviders.length}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
