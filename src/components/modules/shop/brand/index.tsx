"use client";
import { NMTable } from "@/components/ui/core/NMTable";
import { deleteBrand } from "@/services/Brand";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import CreateBrandModal from "./CreateBrandModal";

const ManageBrands = ({ brands }: any) => {
  const handleDelete = async (brand: any) => {
    try {
      const res = await deleteBrand(brand?._id);
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: () => <div>Brand Name</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original.logo}
            alt={row.original.name}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <span className="truncate">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "isActive",
      header: () => <div>isActive</div>,
      cell: ({ row }) => (
        <div>
          {row.original.isActive ? (
            <p className="text-green-500 border bg-green-100 w-14 text-center px-1 rounded">
              True
            </p>
          ) : (
            <p className="text-red-500 border bg-red-100 w-14 text-center px-1 rounded">
              False
            </p>
          )}
        </div>
      ),
    },
    {
      accessorKey: "action",
      header: () => <div>Action</div>,
      cell: ({ row }) => (
        <button
          className="text-red-500"
          title="Delete"
          onClick={() => handleDelete(row.original)}
        >
          <Trash className="w-5 h-5" />
        </button>
      ),
    },
  ];
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Manage Brands</h1>
        <CreateBrandModal />
      </div>
      <NMTable data={brands} columns={columns} />
    </div>
  );
};

export default ManageBrands;
